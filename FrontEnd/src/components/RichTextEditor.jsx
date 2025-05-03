import React, { useState } from 'react'
import Editor, { 
    BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, EditorProvider, HtmlButton, Separator, Toolbar 
  } from 'react-simple-wysiwyg';
function RichTextEditor() {
    const [value,setValue]=useState()

  return (
    <Editor value={value} onChange={(e)=>{
        setValue(e.target.value)
    }}>
      <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
      </Toolbar>
    </Editor>
  )
}

export default RichTextEditor