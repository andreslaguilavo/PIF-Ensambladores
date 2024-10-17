'use client'
import React, { useEffect } from 'react'

const sections = [
  {
    id: 'truth-table',
    name: 'Tabla de verdad'
  },
  {
    id: 'max-terms',
    name: 'Max Términos'
  },
  {
    id: 'min-terms',
    name: 'Min Términos'
  },
  {
    id: 'karnaugh-map',
    name: 'Mapa de Karnaugh'
  }
]
export default function TimeLine() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idLink = document.getElementById(`link-to-${entry.target.id}`)
          if (entry.isIntersecting) {
            idLink?.classList.add('flex-1')
            idLink?.classList.add('font-bold')
          } else {
            idLink?.classList.remove('flex-1')
            idLink?.classList.remove('font-bold')
          }
        })
      },
      { threshold: 0.2 }
    )

    for (const section of sections) {
      observer.observe(document.getElementById(section.id) as HTMLElement)
    }
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className='md:flex flex-col sticky top-10 h-[calc(100vh-80px)] hidden'>
      <div className='w-[2px] bg-black/80 flex h-full justify-center absolute'/>
      {sections.map((section) => (
        <div
          key={section.id}
          className='transition-all duration-500 ease-out flex justify-center items-center  relative'
          id={`link-to-${section.id}`}
        >
          <span className='flex size-6 bg-amber-500/40 absolute -left-[11px] rounded-full justify-center items-center '>
            <span className='size-[8px] rounded-full bg-amber-500'/>
          </span>
          <a
            href={`#${section.id}`}
            className='transition-all duration-500 ease-out flex justify-center items-center font pl-5'
          >
            {section.name}
          </a>
        </div>
      ))}
    </div>
  )
}
