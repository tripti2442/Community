import React, { Component } from 'react'

export class Delete extends Component {
  render() {
    return (
      <div>
        <form>
           
      <input type="text" name="userId" placeholder="Your user id" />
      <input type="text" name="startpoint" placeholder="Your startpoint" />
      <input type="text" name="endpoint"  placeholder="Your endpoint" />
      
        </form>
        <button type="submit">Delete</button>
      </div>
    )
  }
}

export default Delete
