import React from 'react'

export default function Button({content, type, className, disabled , isLoading , onClick}) {
  return (
    <button type={type} disabled={ disabled || isLoading } onClick={onClick} className={`flex items-center justify-center border-0 text-white py-2 px-2 h-[50px] rounded-md bg-purple-500 hover:bg-purple-900 font-bold transition ${className}`}>{content}</button>
  )
}