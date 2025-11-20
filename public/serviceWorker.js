//通常情况下，Service Worker 一旦更新，需要等所有的终端都关闭之后，再重新打开页面才能激活新的 Service Worker

// 一般讲的离线缓存有两种方案，一是在 install 事件中进行离线缓存，二是在 fetch 事件中进行缓存。

// install 阶段缓存的话，需要提供一个需要缓存的资源列表，然后将这个列表中的资源进行缓存；
// fetch 阶段的缓存则针对请求，对每一次请求进行缓存，根据缓存的优先级，主要可以分为服务器优先、缓存优先模式，还有一些其他的介于这两者之间的缓存方案。



this.addEventListener('install', function (event) { //install是执行的第一个事件，并只执行一次  //
    console.log('Service Worker 安装成功:', event);
    event.waitUntil(
        caches.open('v1').then(async function (cache) {
            let urlList = ['/',
                '/video.json',
                '/favicon.ico',
                '/static_list.json'
            ]

            const response = await fetch('/static_list.json');
            if(response.status === 200) {
                const data = await response.json()
                urlList = urlList.concat(data.img_list);
            }
            
            console.log("缓存打开成功");
            console.log(urlList);
            cache.addAll(urlList).then(function () { //缓存文件需要时间所以可以通过waitUntil来防止缓存未完成就关闭serviceWorker一旦所有文件缓存成功那么serviceWorker就安装成功了,只要一个缓存失败就会导致安装失败waitUntil也会通过内部promise来获取安装事件和是否成功
                console.log("所有资源都已获取并缓存");
            }).catch(err => {
                console.log('缓存打开失败', err);
            });
        })
    );
});

this.addEventListener('activate', function (event) {
    console.log('Service Worker 激活成功:', event);
});

/* 注册fetch事件，拦截全站的请求 */
this.addEventListener('fetch', function (event) {
    console.log('Service Worker 拦截请求成功', event);
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // console.log('response:', response)
                //该fetch请求已经缓存
                if (response) { //如果缓存了就取缓存
                    return response;
                }
                return caches.open('v1').then(function (cache) {
                    return fetch(event.request).then((response) => {
                        if (response.status === 200) {
                            // console.log(response)
                            // console.log(event)
                            if(!event.request.url.includes('?t=')){
                                cache.put(event.request, response.clone());
                            }
                            return response
                        }
                    })
                });
            })
    );
});