---
title: "Learn React’s “Render” Prop Pattern By Building A Pop-Up Modal"
date: 2018-05-06T11:01:07-07:00
path: /blog/react-render-prop-pattern
excerpt: "A quick tutorial on what it is, how to use it, and why it’ll make your React code easier to work with."
tags: ["react"]
---

The first time I came across the pattern of the `render` prop was in v3 of the wonderful React-Router library. That was nearly 2 years ago. I’ve used it here and there but I didn’t realize all the beauty behind it until I recently learned it was being used as an [alternative to HOC’s](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce). It was also introduced into React 16. The `render` prop was clearly a pattern I needed to revisit!

Unfortunately for me, my company has been using an older version of React and I’m so behind with all the updates to React. However, since it’s just a pattern it doesn’t matter the version because it can be implemented in just a few lines of code. Let me first define what this pattern is and then we’ll go through an example to see how it works.

## What is a Render Prop?

In the React documentation it is:

> a simple technique for sharing code between React components using a prop whose value is a function

Huh? Okay. Let’s turn to [Michael Jackson](https://medium.com/@mjackson), who explains in his article [Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) that a render prop is:

> a function prop that a component uses to know what to render

Better? The definition may be hard to grasp. So let’s build something to learn how it works.

## A Simple Pop-Up Modal

What we’ll build is a simple pop-up modal. Let’s think about how a modal works:

- A modal can pop-up (open) by some action, normally displaying in front of or on top of other HTML elements
- A modal can close, by itself or by some other action

Let’s now think about how we can modularize this idea:

- A modal should only care about hiding and displaying in front of or on top of other HTML elements
- The React components that use the modal should have the responsibility of what is in the modal and how to interact with it and let the modal perform it’s duties explained in the previous point

Let’s implement point #2 so we can see how we’ll be using the pop-up modal.

```javascript
handleSubmit(e, close) {
  // process submit then call `close`
}
render() {
  return (
    <Modal
      render=({ close }) => {
        <form onSubmit={(e) => this.handleSubmit(e, close)}>
          <input type="text" name="username">
          <input type="text" name="password">
          <button type="submit>Log In</button>
        </form>
      }
    />
  );
}
```

This component renders a `Modal` component and provides a `render` function as a prop. You’ll see this in a second but essentially the `Modal` component will call the `render` function to render the form content you see above. We are saying, “hey Modal, here, take this render function. Render your content, then when you’re ready call the render function and I’ll take care of what it returns. Just provide me a close method please.”

Before `render`, you’d have most of the logic, state, and HTML elements within the `Modal` component, or render children inside it, or create instances of HOC’s. With `render`, the **parent is given the responsibility to render what logically should be viewed and controlled by them**. This relieves the `Modal` from containing any irrelevant code besides it’s logic to open and close.

More interestingly is that `Modal` can provide basically anything to the `render` function that the parent can utilize. In this example the `render` function contains a single object as it’s argument but you can imagine what else could be provided; especially in a more complex example.

Let’s see what the `Modal` class looks like.

```javascript
class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false };
  }
  open() {
    this.setState({ open: true });
  }
  close() {
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    const { render } = this.props;
    return (
      <div>
        <button onClick={this.open}>Open</button>
        {open &&
          <div className="modal">
            <div className="bg" />
            <div className="fg">
              {render({ close: this.close })}
            </div>
          </div>
        }
      </div>
    );  
  }
}
```

Let’s assume all the styling for positioning, z-indexes, and displays are correctly set. I’ve placed some CSS classes to help explain what’s going on. Let’s review what we have here:

- initially the modal is not opened and only renders a button. The div with the class `modal` will not display since the modal state is not open.
once the button is clicked the modal will open and the div with the class `modal` will display. The div with the class `bg` will cover and blur the entire window while the div with the class `fg` will contain the modal content.
- the `render` function will get called with a single object with the `close` function as one of it’s properties.

Pay close attention to the `render` prop. By calling this function with the `close` method, the modal is essentially allowing the parent to close the modal. It will be the parent components job to call at a later, more opportune time. In the example earlier, the parent component called `close` after the form was submitted. Sweet huh?

## Let’s Review Our Example

The modal achieves it’s goals of opening and closing. It also shares this logic with parent components so they, too, can support those goals.

The parent component provides, what I like to call, a “render callback prop” that allows us to achieve a few things:

- providing the modal component with a callback helps achieve the concept of separation of concern.
- aesthetically, the code we want to see in this component stays within it. It’s not in the modal component; a component that may exist in another file. To debug or visualize how the HTML content will display it is all in one place in the `render` function of the component.
- since the `render` callback prop is defined in the parent component it will continue to have access to it’s scope. This allowed the parent to call `this.handleSubmit` and at the same time, use variables provided by the modal.
the render callback prop was provided in-line. We could have easily created another component to utilize React’s lifecycle methods and provide that instead.

## Conclusion

- `render` prop is another tool to add to your tool belt; use it when you need to. It’s use cases are similar to HOC’s but the approach is different.
- remember that every time the child’s `render` function is called so does the `render` callback prop. Furthermore, every render of the parent component adds to this number of renders as well.

## Additional Resources:

- https://reactjs.org/docs/render-props.html
- https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
- https://reacttraining.com/react-router/web/api/Route/render-func
- https://reactjs.org/docs/higher-order-components.html
