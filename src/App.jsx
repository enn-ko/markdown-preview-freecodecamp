import React,{useState} from 'react'
import {FaFreeCodeCamp} from 'react-icons/fa'
import {BsArrowsAngleContract,BsArrowsFullscreen} from 'react-icons/bs'
import { marked } from 'marked'


const App = () => {
  marked.setOptions({
    breaks: true,

  })

  const renderer = new marked.Renderer();
  renderer.link = function(href,title,markdown){
    return `<a target="_blank" href="${href}">${markdown}</a>`
  }
  const [markdown,setMarkdown] = useState(`
  # Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  |Wild Header | Crazy Header | Another Header?|
  |------------ | ------------- | -------------|
  |Your content can | be here, and it | can be here....|
  |And here. | Okay. | I think we get it.|
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  
  `)
  const [toggleEditor,setToggleEditor] = useState(false)
  var editor = document.getElementById("editorwrap")
  var editorfull = document.getElementById('editorfull')
  var editorangle = document.getElementById('editorangle')
  var preview = document.getElementById("preview")
  var previewfull = document.getElementById("previewfull")
  var previewangle = document.getElementById("previewangle")
  const handleEdite = ()=>{
      preview.classList.add('hidden')
      editorfull.classList.add('hidden')
      editorangle.classList.remove('hidden')
      editor.classList.add('maxi')
      setToggleEditor(true)
      if(toggleEditor){
        preview.classList.remove('hidden')
        editor.classList.remove('maxi')
        editorfull.classList.remove('hidden')
        editorangle.classList.add('hidden')
        setToggleEditor(false)
      }
 
      console.log(editorangle);
  }
  const handlePreview = ()=>{
    editor.classList.add('hidden')
    previewfull.classList.add('hidden')
    previewangle.classList.remove('hidden')
    setToggleEditor(true)
    if(toggleEditor){
      editor.classList.remove('hidden')
      previewfull.classList.remove('hidden')
      previewangle.classList.add('hidden')
      setToggleEditor(false)
    }

  }

  return (
    <div id='markdown'>
    <div id='editorwrap' className='flex flex-col mx-auto w-[40%]'>
      <div className="toolbar">
        <h1 className='flex items-center gap-3 text-2xl font-bold'><FaFreeCodeCamp/>Editor</h1>
        <button onClick={handleEdite}>
        <BsArrowsFullscreen id='editorfull' className='icon'/>
        <BsArrowsAngleContract id='editorangle' className='icon hidden'/>
        </button>
      </div>
        <textarea id="editor" className='px-5 py-2' value={markdown} onChange={(e)=>setMarkdown(e.target.value)} type='text'>
        </textarea>
    </div>
    <div id='previewwrap'>
    <div className="toolbar">
        <h1 className=''><FaFreeCodeCamp/>Preview</h1>
        <button onClick={handlePreview}>
        <BsArrowsFullscreen id='previewfull' className='icon'/>
        <BsArrowsAngleContract id='previewangle' className='icon hidden'/>        
        </button>
      </div>
      <article >
        <div id='preview' dangerouslySetInnerHTML={{
        __html:marked(markdown, {renderer : renderer})
      }}>
        </div>
      </article>
    </div>
    </div>
  )
}


export default App