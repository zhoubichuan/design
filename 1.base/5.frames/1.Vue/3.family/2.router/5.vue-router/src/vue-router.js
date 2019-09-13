class historyRoute {
    constructor() {
        this.current = null
    }
}
class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []
        //你传递的这个路由是一个数组{'/home':Home,'/about',About}
        this.routesMap = this.createMap(this.routes)
        // 路由中需要存放当前的路径 需要状态
        this.history = new historyRoute
        this.init()
    }
    init() {
        if (this.mode === 'hash') {
            location.hash ? '' : location.hash = "/"
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1)
            })
        } else {
            location.pathname ? '' : location.pathname = "/"
            window.addEventListener('load', () => {
                this.history.current = location.pathname
            })
            window.addEventListener("popstate", () => {
                this.history.current = location.pathname
            })
        }
    }
    go() {

    }
    back() {

    }
    push() {

    }
    createMap(routes) {
        return routes.reduce((memo, current) => {
            memo[current.path] = current.component
            return memo
        }, [])
    }
}
VueRouter.install = function (Vue) {
    //在所有组件中获取同一个路由实例
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.router) { //定位根组件
                this._root = this
                this._router = this.$options.router
                Vue.util.defineReactive(this, 'xxx', this._router.history)
            } else {
                this._root = this.$parent._root
            }
            Object.defineProperty(this, '$router', {
                get() {
                    return this._root._router
                }
            })
            Object.defineProperty(this, '$route', {
                get() {
                    return {
                        // 当前的路由所在的状态
                        current: this._root.xxx.current
                    }
                }
            })
        }
    })

    Vue.component('router-link', {
        props: {
            to: String,
            tag: String
        },
        methods: {
            handleClick() {
                //跳转逻辑
            }
        },
        render() {
            let mode = this._self._root._router.mode
            let tag = this.tag || 'a'
            return <tag on-click = {
                this.handleClick
            }
            href = {
                mode === 'hash' ? `#${this.to}` : this.to
            } > {
                this.$slots.default
            } </tag>
        }
     
    })
    Vue.component('router-view', {
        render(h) {
            let current = this._self._root._router.history.current
            let routeMap = this._self._root._router.routesMap
            return h(routeMap[current])
        }
    })
}
//使用vue.use就会调用install
export default VueRouter