# React 开发规范

## 基本规范

- 每个文件只写一个 React 组件，并且文件名和组件名相同

```
// 文件命名
-- home-page

// 组件命名
export default class HomePage extends Component {}
```

- 必须使用 ES6+ 语法（[ECMAScript 6 入门](http://es6.ruanyifeng.com/)）

- 不要使用 React.createElement，除非从一个非 JSX 的文件中初始化你的 app

## 创建组件

- 组件没有状态或没有引用 `refs`，推荐使用普通函数

```js{10}
// bad
class List extends React.Component {
  render() {
    const { text } = this.props;
    return <div>{text}</div>;
  }
}

// good
const List = props => {
  const { text } = props;
  return <div>{text}</div>;
};
```

- 组件有内部状态或引用 `refs`，并且确定 `state`和`props`数据扁平化，推荐使用纯组件

```js{13}
// bad
class List extends React.Component {
  state = {
    text: "example"
  };
  render() {
    const { text } = this.state;
    return <div>{text}</div>;
  }
}

// good
class List extends React.PurComponent {
  state = {
    text: "example"
  };
  render() {
    const { text } = this.state;
    return <div>{text}</div>;
  }
}
```

- 组件有内部状态或引用 `refs`，`state`和`props`数据复杂，推荐使用`Component`组件

```js{19}
// bad
class List extends React.PurComponent {
  state = {
    arr: [1, 2, 3]
  };
  render() {
    const { arr } = this.state;
    return (
      <Fragment>
        {arr.map(value => (
          <div>{value}</div>
        ))}
      </Fragment>
    );
  }
}

// good
class List extends React.Component {
  state = {
    arr: [1, 2, 3]
  };
  render() {
    const { arr } = this.state;
    return (
      <Fragment>
        {arr.map(value => (
          <div>{value}</div>
        ))}
      </Fragment>
    );
  }
}
```

## Mixins

不推荐使用 `Mixins`, `Mixins`会增加隐式的依赖，导致命名冲突，并且会以滚雪球式增加复杂度。在大多数情况下`Mixins`可以被更好的方法替代，如：组件化，高阶组件，工具模块等

## 命名

### 扩展名

React 组件使用`.jsx`或`.tsx`扩展名

### 文件名

- 文件、文件夹名小写，使用短横线分割，例`split-line`

- 页面组件末尾加`page`，例如`home-page`

### 引用命名

- React 组件名使用帕斯卡命名

- React 实例使用驼峰命名

```jsx
// bad
import tabList from "./tab-list";

// good
import TabList from "./tab-list";

// bad
const TabList = <TabList />;

// good
const tabList = <TabList />;
```

### 组件命名

组件使用当前文件名一样的名称。比如 `Card.jsx` 应该包含名为 Card 的模块. 但是，如果整个文件夹是一个组件，使用 `index.js`或`index.ts` 作为入口文件，然后直接使用 `index.js`或`index.ts` 或者文件夹名作为组件的名称

```tsx
// bad
import Footer from "./Footer/Footer";

// bad
import Footer from "./Footer/index";

// good
import Footer from "./Footer";
```

### 属性命名

避免使用 DOM 相关的属性来用作其他的用途

> 为什么？对于 style 和 className 这样的属性名，我们都会默认它们代表一些特殊的含义，如元素的样式，CSS class 的名称。在你的应用中使用这些属性来表示其他的含义会使你的代码更难阅读，更难维护，并且可能会引起 bug

```jsx
// bad
<MyComponent style="fancy" />

// good
<MyComponent variant="fancy" />
```

## Props 属性

- JSX 属性名使用骆驼命名

```jsx
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```

- `<img>` 标签总是添加 `alt` 属性

- 不要在 alt 值里使用如 "image", "photo", or "picture"包括图片含义这样的词， 中文也一样

> 为什么? 屏幕助读器已经把 img 标签标注为图片了, 所以没有必要再在 alt 里说明了.

```jsx
// bad
<img src="hello.jpg" alt="Picture of me waving hello" />

// good
<img src="hello.jpg" alt="Me waving hello" />
```

- 使用有效正确的 aria `role`属性值

```jsx
// bad - not an ARIA role
<div role="datepicker" />

// bad - abstract ARIA role
<div role="range" />

// good
<div role="button" />
```

- 不要在标签上使用 accessKey 属性

> 为什么? 屏幕助读器在键盘快捷键与键盘命令时造成的不统一性会导致阅读性更加复杂

```jsx
// bad
<div accessKey="h" />

// good
<div />
```

- 避免使用数组的 index 来作为属性 key 的值，推荐使用唯一 ID

```jsx
// bad
{
  todos.map((todo, index) => <Todo {...todo} key={index} />);
}

// good
{
  todos.map(todo => <Todo {...todo} key={todo.id} />);
}
```

- 对于所有非必须的属性，总是手动去定义 defaultProps 属性

> 为什么? propTypes 可以作为模块的文档说明, 并且声明 defaultProps 的话意味着阅读代码的人不需要去假设一些默认值。更重要的是, 显示的声明默认属性可以让你的模块跳过属性类型的检查.

```jsx
// bad
function SFC({ foo, bar, children }) {
  return (
    <div>
      {foo}
      {bar}
      {children}
    </div>
  );
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node
};

// good
function SFC({ foo, bar, children }) {
  return (
    <div>
      {foo}
      {bar}
      {children}
    </div>
  );
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node
};
SFC.defaultProps = {
  bar: "",
  children: null
};
```

- 尽可能地排除不必要的属性

```jsx
// bad
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...this.props} />
}

// good
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...relevantProps} />
}
```

## Refs

- 总是在 Refs 里使用回调函数

```jsx
// bad
<Foo
  ref="myRef"
/>

// good
<Foo
  ref={(ref) => { this.myRef = ref; }}
/>
```

## Methods 函数

- 采用箭头函数写法

```jsx
// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv.bind(this)} />;
  }
}

// bad
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />;
  }
}

// good
class extends React.Component {

  onClickDiv = () => {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />;
  }
}
```

- 使用箭头函数来获取本地变量

```jsx{7}
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={() => doSomethingWith(item.name, index)}
        />
      ))}
    </ul>
  );
}
```

## 注释

- 每个组件必须写该组件的业务功能

- 方法注释，说明该方法的功能，如果有参数，尽量写参数说明

- `state`和`props`写明每个属性作用

## 封装和分离

- 每个组件不应该超过 300 行

- 每个方法不应该超过 40 行

## 组件内部结构体

1. 构造函数
2. 生命周期方法
3. render 方法渲染视图
4. 自定 renderXXX 渲染子组件
5. 自定义方法（接口请求方法与接口 API 保持相同）
6. 样式放在最后

```tsx
export default class DemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.initVal();
  }
  initVal = () => {};
  componentWillMount() {}
  render() {
    return <View style={ResStyles.container}>{this.renderContent()}</View>;
  }
  renderContent = () => {
    return <View />;
  };
  loadData = () => {};
}
const styles = StyleSheet.create({
  container: {}
});
```
