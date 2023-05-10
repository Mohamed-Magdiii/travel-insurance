import React from 'react'

export const handleEdit = (id,title,history)=>{
    
history.push(`/setup/${title}/${id}/edit`) 
}

export const handleAdd= (title,history)=>{
        history.push(`/setup/${title}/new`) 
}