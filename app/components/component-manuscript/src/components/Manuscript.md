An editor for a manuscript.

```js
const content = `
<container id="main">
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
</container>`

const currentUser = {
  teams: [{ teamType: { name: 'Production Editor' } }],
}
;<Manuscript
  content={content}
  currentUser={currentUser}
  fileUpload={data => console.log(data)}
  updateManuscript={data => console.log(data)}
  version={{}}
/>
```
