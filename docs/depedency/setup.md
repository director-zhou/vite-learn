
## optimizeDeps 代码内容

``` js
const { root, logger, cacheDir } = config
const log = asCommand ? logger.info : debug
```

从`config`解析的配置中获取

1. **root** 项目的配置根目录
2. **logger** 提示工作
3. **cacheDir** 缓存目录

如果是通过命令行调用，提示调调有和`logger`工具中的`info`进行提示输出

## 判断是否有cacheDir缓存目录

```js
if (!cacheDir) {
  log(`No cache directory. Skipping.`)
  return null
}
```

如果没有缓存目录,则直接退出。

## 缓存相关元信息文件地址

```js
 const dataPath = path.join(cacheDir, '_metadata.json')
```

`dataPath`优化器优化完生成记录的生成的元信息存储的地址, 是存在缓存目录下的`_metadata.json`中。


## 生成比对变更构建hash

```js 
const mainHash = getDepHash(root, config)

const lockfileFormats = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml']

let cachedHash: string | undefined

function getDepHash(root: string, config: ResolvedConfig): string {
  if (cachedHash) {
    return cachedHash
  }
  let content = lookupFile(root, lockfileFormats) || ''
  // also take config into account
  // only a subset of config options that can affect dep optimization
  content += JSON.stringify(
    {
      mode: config.mode,
      root: config.root,
      resolve: config.resolve,
      assetsInclude: config.assetsInclude,
      plugins: config.plugins.map((p) => p.name),
      optimizeDeps: {
        include: config.optimizeDeps?.include,
        exclude: config.optimizeDeps?.exclude
      }
    },
    (_, value) => {
      if (typeof value === 'function' || value instanceof RegExp) {
        return value.toString()
      }
      return value
    }
  )
  return createHash('sha256').update(content).digest('hex').substr(0, 8)
}
```

`mainHash` 构建`hash` 是由 `getDepHash` 方法生成，方法传入参数`根目录`和`配置文件信息`

> getDepHash 函数

初始声明了`cachedHash`的变量, 如果有`cachedHash`则返回`cachedHash`, 否则进行生成

通过寻找锁文件来确定`node_modules`信息内容,赋值到`content`变量上。通过`utils`文件里`lookupFile`方法,以`root`配置的目录开始寻找


> 理解注释
```js
  // also take config into account
  // only a subset of config options that can affect dep optimization
```

不但`node_modules`的内容会影响加载的优化内容是否正确, 同时**mode**,**root**,**resolve**,**assetsInclude**,**plugins**,**optimizeDeps**的变动也会存在影响。

同时在对配置进行`JSON.stringify`的时候对函数或者正则进行`string`处理。

```js
import { createHash } from 'crypto'
```

最后调用`Node crypto`模块中的`createHash`生成`8`位`hash`,来确保当前优化的内容与下次优化的时候是否保持一致。减少不必要的优化。


## 确定优化元数据的存储格式

```js
const data: DepOptimizationMetadata = {
  hash: mainHash,
  browserHash: mainHash,
  optimized: {}
}
```

前面讲过了。到时候这里进行关联

## 是否需要预构建

```js
 if (!force) {
    let prevData
    try {
      prevData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    } catch (e) {}
    // hash is consistent, no need to re-bundle
    if (prevData && prevData.hash === data.hash) {
      log('Hash is consistent. Skipping. Use --force to override.')
      return prevData
    }
  }
```


> server.force  Api

设置为 `true` 强制使依赖预构建。无论任何情况下, 都将对预构建内容和元数据进行重新生成。这往往解决一些未知的情况。

> 理解注释
```js
// hash is consistent, no need to re-bundle
```

声明`preData`变量, 用来读取存储优化后元数据的目录中的元数据内容。如果有元数据内容并且上次预构建的`hash`和此次进行的预构建`hash`一致的情况下, 直接返回元数据内容。`optimizeDeps`函数最后返回的就是元数据内容。


## 清空, 生成缓存目录

```js
  if (fs.existsSync(cacheDir)) {
    emptyDir(cacheDir)
  } else {
    fs.mkdirSync(cacheDir, { recursive: true })
  }
```

运行到这里, 说明两个情况

1. 对`server.force`设置了`true`
2. 两个前后两个`hash`保持不一致, 说明.lock文件或者配置文件内容有变更。

如果存在缓存目录,说明之前已经存在构建的情况,不是首次启动服务器, 对缓存目录进行清空。

否则递归创建缓存目录文件夹。用来后续进行元文件信息和缓存内容进行存储。