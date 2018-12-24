# Airbnb React/JSX Style Guide

*A mostly reasonable approach to React and JSX*

This style guide is mostly based on the standards that are currently prevalent in JavaScript, although some conventions (i.e async/await or static class fields) may still be included or prohibited on a case-by-case basis. Currently, anything prior to stage 3 is not included nor recommended in this guide.

## Table of Contents
  
  1. [Basic Rules](#basic-rules)
  1. [Standard Javascript Rules](#standard-javascript-rules)
  1. [Class vs `React.createClass` vs stateless](#class-vs-reactcreateclass-vs-stateless)
  1. [Mixins](#mixins)
  1. [Naming](#naming)
  1. [Declaration](#declaration)
  1. [Alignment](#alignment)
  1. [Quotes](#quotes)
  1. [Spacing](#spacing)
  1. [Props](#props)
  1. [Refs](#refs)
  1. [Parentheses](#parentheses)
  1. [Tags](#tags)
  1. [Methods](#methods)
  1. [Ordering](#ordering)

## Basic Rules

  - Only include one React component per file.
    - However, multiple [Stateless, or Pure, Components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) are allowed per file. eslint: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).
  - Always use JSX syntax.
  - Do not use `React.createElement` unless you’re initializing the app from a file that is not JSX.
  
## Standard Javascript Rules

  - **Use 2 spaces** for indentation.
    ```jsx
     function hello (name) {
        console.log('hi ' + name)
     }
    ```
  - **Use single quotes** for strings except to avoid escaping.
    ```jsx
    console.log('hello there')
    $("<div class='box'>")
    ```
  - **Add a space** after keywords.
    ```jsx
    // bad
    if(condition) { ... }
    
    // good
    if (condition) { ... }
    ```
  - Add a space before a function declaration's parentheses.
    ```jsx
    // bad
    function name(arg) { ... }
    // good
    function name (arg) { ... }
    
    // bad
    run(function() { ... }) 
    // good
    run(function () { ... })
    ```
  - Always use === instead of ==.
  - **Infix operators** must be spaced.
    ```jsx
    // bad 
    var x=2
    var message = 'hello, '+name+'!'
    
    //good
    var x = 2
    var message = 'hello, ' + name + '!' 
    ```
  - Commas should have a space.
    ```jsx
    // bad 
    var list = [1,2,3,4]
    function greet (name,options) { ... }
    
    //good
    var list = [1, 2, 3, 4]
    function greet (name, options) { ... }
    ```
  - Keep else statements on the same line as their curly braces.
    ```jsx
    // bad 
    if (options.quiet !== true) console.log('done')
    if (condition) {
      // ...
    }
    else {
      // ...
    }
    
    //good
    if (options.quiet !== true) {
        console.log('done')
    }
    if (condition) {
      // ...
    } else {
      // ...
    }
    ```
  - No unused variables.
  - No semicolons.
    ```jsx
    // bad 
    window.alert('hi')
    
    //good
    window.alert('hi') 
    ```
  - Trailing commas not allowed.
    ```jsx
    // bad 
    var obj = {
        message: 'hello',
    }
    
    //good
    var obj = {
        message: 'hello'
    }
    ```
  - Commas must be placed at the end of the current line.
    ```jsx
    // bad 
    var obj = {
        foo: 'foo'
        ,bar: 'bar'
    }
    
    //good
    var obj = {
        foo: 'foo',
        bar: 'bar'
    }
    ```
  - Maximum line length is 80. [`eslint/max-len`](https://eslint.org/docs/rules/max-len)
    ```jsx
    // very long
    var foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" }, "difficult": "to read" };
    
    //good
    var foo = {
        "bar": "This is a bar.",
        "baz": { "qux": "This is a qux" },
        "easier": "to read"
    }
    ```
    
     

## Class vs `React.createClass` vs stateless

  - If you have internal state and/or refs, prefer `class extends React.Component` over `React.createClass`. eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

    ```jsx
    // bad
    const Listing = React.createClass({
        // ...
        render() {
            return <div>{this.state.hello}</div>
        }
    })

    // good
    class Listing extends React.Component {
        // ...
        render() {
            return (
                <div>{this.state.hello}</div>
            )
        }
    }
    ```

    And if you don’t have state or refs, prefer normal functions (not arrow functions) over classes:

    ```jsx
    // bad
    class Listing extends React.Component {
        render() {
            return <div>{this.props.hello}</div>
        }
    }

    // bad (relying on function name inference is discouraged)
    const Listing = ({ hello }) => (
        <div>{hello}</div>
    )

    // good
    const Listing = ({ hello }) => {
        return (
            <div>{hello}</div>
        )
    }
    ```

## Mixins

  - [Do not use mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).

  > Why? Mixins introduce implicit dependencies, cause name clashes, and cause snowballing complexity. Most use cases for mixins can be accomplished in better ways via components, higher-order components, or utility modules.

## Naming

  - **Extensions**: Use `.js` extension for React components. eslint: [`react/jsx-filename-extension`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)
  - **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.js`.
  - **Reference Naming**: Use PascalCase for React components and camelCase for their instances. eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

    ```jsx
    // bad
    import reservationCard from './ReservationCard'

    // good
    import ReservationCard from './ReservationCard'

    // bad
    const ReservationItem = <ReservationCard />

    // good
    const reservationItem = <ReservationCard />
    ```

  - **Component Naming**: Use the filename as the component name. For example, `ReservationCard.js` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.js` as the filename and use the directory name as the component name:

    ```jsx
    // bad
    import Footer from './Footer/Footer'

    // bad
    import Footer from './Footer/index'

    // good
    import Footer from './Footer'
    ```

  - **Props Naming**: Avoid using DOM component prop names for different purposes.

    > Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

    ```jsx
    // bad
    <MyComponent style="fancy" />

    // bad
    <MyComponent className="fancy" />

    // good
    <MyComponent variant="fancy" />
    ```

## Declaration

  - Do not use `displayName` for naming components. Instead, name the component by reference.

    ```jsx
    // bad
    export default React.createClass({
        displayName: 'ReservationCard',
        // stuff goes here
    })

    // good
    export default class ReservationCard extends React.Component {
    }
    ```

## Alignment

  - Follow these alignment styles for JSX syntax. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) [`react/jsx-closing-tag-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)

    ```jsx
    // bad
    <Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

    // good
    <Foo
        superLongParam="bar"
        anotherSuperLongParam="baz"
    />

    // if props fit in one line then keep it on the same line
    <Foo bar="bar" />

    // children get indented normally
    <Foo
        superLongParam="bar"
        anotherSuperLongParam="baz"
    >
      <Quux />
    </Foo>

    // bad
    {showButton &&
      <Button />
    }

    // bad
    {
      showButton &&
        <Button />
    }

    // good
    {showButton && (
        <Button />
    )}

    // good
    {showButton && <Button />}
    ```

## Quotes

  - Always use double quotes (`"`) for JSX attributes, but single quotes (`'`) for all other JS. eslint: [`jsx-quotes`](https://eslint.org/docs/rules/jsx-quotes)

    > Why? Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

    ```jsx
    // bad
    <Foo bar='bar' />

    // good
    <Foo bar="bar" />

    // bad
    <Foo style={{ left: "20px" }} />

    // good
    <Foo style={{ left: '20px' }} />
    ```

## Spacing

  - Always include a single space in your self-closing tag. eslint: [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces), [`react/jsx-tag-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)

    ```jsx
    // bad
    <Foo/>

    // very bad
    <Foo                 />

    // bad
    <Foo
     />

    // good
    <Foo />
    ```

  - Do not pad JSX curly braces with spaces. eslint: [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

    ```jsx
    // bad
    <Foo bar={ baz } />

    // good
    <Foo bar={baz} />
    ```

## Props

  - Always use camelCase for prop names.

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

  - Always include an `alt` prop on `<img>` tags. If the image is presentational, `alt` can be an empty string or the `<img>` must have `role="presentation"`. eslint: [`jsx-a11y/alt-text`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)

    ```jsx
    // bad
    <img src="hello.jpg" />

    // good
    <img src="hello.jpg" alt="Me waving hello" />

    // good
    <img src="hello.jpg" alt="" />

    // good
    <img src="hello.jpg" role="presentation" />
    ```

  - Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/#usage_intro). eslint: [`jsx-a11y/aria-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

    ```jsx
    // bad - not an ARIA role
    <div role="datepicker" />

    // bad - abstract ARIA role
    <div role="range" />

    // good
    <div role="button" />
    ```

  - Do not use `accessKey` on elements. eslint: [`jsx-a11y/no-access-key`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

  > Why? Inconsistencies between keyboard shortcuts and keyboard commands used by people using screenreaders and keyboards complicate accessibility.

    ```jsx
    // bad
    <div accessKey="h" />
    
    // good
    <div />
    ```

  - Avoid using an array index as `key` prop, prefer a stable ID. eslint: [`react/no-array-index-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)

> Why? Not using a stable ID [is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) because it can negatively impact performance and cause issues with component state.

We don’t recommend using indexes for keys if the order of items may change.

  ```jsx
  // bad
  {todos.map((todo, index) =>
      <Todo
          {...todo}
          key={index}
      />
  )}

  // good
  {todos.map(todo => (
    <Todo
      {...todo}
      key={todo.id}
    />
  ))}
  ```

  - Always define explicit defaultProps for all non-required props.

  > Why? propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

  ```jsx
  // bad
  function SFC({ foo, bar, children }) {
      return (
          <div>{foo}{bar}{children}</div>
      )
  }
  SFC.propTypes = {
      foo: PropTypes.number.isRequired,
      bar: PropTypes.string,
      children: PropTypes.node,
  }

  // good
  function SFC({ foo, bar, children }) {
      return (
          <div>{foo}{bar}{children}</div>
      )   
  }
  SFC.propTypes = {
      foo: PropTypes.number.isRequired,
      bar: PropTypes.string,
      children: PropTypes.node,
  }
  SFC.defaultProps = {
      bar: '',
      children: null,
  }
  ```

  - Use spread props sparingly.
  > Why? Otherwise you’re more likely to pass unnecessary props down to components. And for React v15.6.1 and older, you could [pass invalid HTML attributes to the DOM](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html).

  Exceptions:

  - HOCs that proxy down props and hoist propTypes

  ```jsx
  function HOC(WrappedComponent) {
      return class Proxy extends React.Component {
          Proxy.propTypes = {
              text: PropTypes.string,
              isLoading: PropTypes.bool
          }
        
          render() {
              return (
                  <WrappedComponent {...this.props} />
              )
          }
      }
  }
  ```

  - Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha’s beforeEach construct.

  ```jsx
  export default function Foo {
    const props = {
      text: '',
      isPublished: false
    }

    return (<div {...props} />)
  }
  ```

  Notes for use:
  Filter out unnecessary props when possible. Also, use [prop-types-exact](https://www.npmjs.com/package/prop-types-exact) to help prevent bugs.

  ```jsx
  // bad
  render() {
      const { irrelevantProp, ...relevantProps  } = this.props
      return <WrappedComponent {...this.props} />
  }

  // good
  render() {
      const { irrelevantProp, ...relevantProps  } = this.props
      return (
          <WrappedComponent {...relevantProps} />
      )
  }
  ```

## Refs

  - Always use ref callbacks. eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

    ```jsx
    // bad
    <Foo
      ref="myRef"
    />

    // good
    <Foo
      ref={(ref) => { this.myRef = ref }}
    />
    ```

## Parentheses

  - Wrap JSX tags in parentheses when they span more than one line. eslint: [`react/jsx-wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

    ```jsx
    // bad
    render() {
      return <MyComponent variant="long body" foo="bar">
               <MyChild />
             </MyComponent>
    }

    // good
    render() {
        return (
            <MyComponent variant="long body" foo="bar">
                <MyChild />
            </MyComponent>
        )
    }

    // good, when single line
    render() {
        const body = <div>hello</div>
        return (
            <MyComponent>{body}</MyComponent>
        )
    }
    ```

## Tags

  - Always self-close tags that have no children. eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

    ```jsx
    // bad
    <Foo variant="stuff"></Foo>

    // good
    <Foo variant="stuff" />
    ```

  - If your component has multi-line properties, close its tag on a new line. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

    ```jsx
    // bad
    <Foo
        bar="bar"
        baz="baz" />

    // good
    <Foo
        bar="bar"
        baz="baz"
    />
    ```

## Methods

  - Use arrow functions to close over local variables.

    ```jsx
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
        )
    }
    ```

  - Bind event handlers for the render method in the constructor. eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

    > Why? A bind call in the render path creates a brand new function on every single render.

    ```jsx
    // bad
    class extends React.Component {
        onClickDiv() {
        // do stuff
        }

        render() {
            return <div onClick={this.onClickDiv.bind(this)} />
        }
    }

    // good
    class extends React.Component {
        constructor(props) {
            super(props)
            
            this.onClickDiv = this.onClickDiv.bind(this)
        }

        onClickDiv() {
        // do stuff
        }

        render() {
            return <div onClick={this.onClickDiv} />
        }
    }
    ```

  - Do not use underscore prefix for internal methods of a React component.
    > Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public. See issues [#1024](https://github.com/airbnb/javascript/issues/1024), and [#490](https://github.com/airbnb/javascript/issues/490) for a more in-depth discussion.

    ```jsx
    // bad
    React.createClass({
        _onClickSubmit() {
            // do stuff
        },
        
        // other stuff
    })

    // good
    class extends React.Component {
        onClickSubmit() {
            // do stuff
        }
        
        // other stuff
    }
    ```

  - Be sure to return a value in your `render` methods. eslint: [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

    ```jsx
    // bad
    render() {
      (<div />)
    }

    // good
    render() {
        return (
            <div />
        )
    }
    ```

## Ordering

  - Ordering for `class extends React.Component`:

  1. optional `static` methods
  1. `constructor`
  1. `getChildContext`
  1. `getDerivedStateFromProps`
  1. `componentDidMount`
  1. `shouldComponentUpdate`
  1. `getSnapshotBeforeUpdate`
  1. `componentDidUpdate`
  1. `componentDidCatch`
  1. `componentWillUnmount`
  1. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
  1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
  1. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
  1. `render`

  - How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

    ```jsx
    import React from 'react'
    import PropTypes from 'prop-types'

    export default class Link extends React.Component {
        static methodsAreOk() {
            return true
        }
        
        constructors(props) {
            super(props)
            
            // declare method
            this.onClickDiv = this.onClickDiv.bind(this)
            
            //declare attributes
            this.name = 'Abon'
            this.state = {
                isShow: false
            }
        }

        render() {
            return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
        }
    }

    Link.propTypes = {
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        text: PropTypes.string,
    }
    Link.defaultProps = {
        text: 'Hello World'
    }
    ```

  - Ordering for `React.createClass`: eslint: [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

  1. `displayName`
  1. `propTypes`
  1. `contextTypes`
  1. `childContextTypes`
  1. `mixins`
  1. `statics`
  1. `defaultProps`
  1. `getDefaultProps`
  1. `getInitialState`
  1. `getChildContext`
  1. `getDerivedStateFromProps`
  1. `componentDidMount`
  1. `shouldComponentUpdate`
  1. `getSnapshotBeforeUpdate`
  1. `componentDidUpdate`
  1. `componentDidCatch`
  1. `componentWillUnmount`
  1. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
  1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
  1. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
  1. `render`

**[⬆ back to top](#table-of-contents)**
