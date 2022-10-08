import React, { useEffect, useState } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useLocalStorage from 'use-local-storage'

import SwitchTheme from '@components/SwitchTheme'
import { ProjectPages } from '@utils/Constants'

interface IProject {
  title: string
  path: string
}

const Home: NextPage = () => {
  const { locale } = useRouter()
  const [mounted, setMounted] = useState(false)
  const [project, setProject] = useLocalStorage('project', null as IProject)
  const [index, setIndex] = useState(
    ProjectPages.findIndex(({ title }) => title === project?.title)
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted && !project) {
    setProject(ProjectPages[~~(Math.random() * ProjectPages.length)])
  }

  const moveNext = () => {
    const next = (index + 1) % ProjectPages.length

    setIndex(next)
    setProject(ProjectPages[next])
  }

  const movePrevious = () => {
    let previous = index

    if (index === 0) {
      previous = ProjectPages.length
    }

    previous = previous - 1

    setIndex(previous)
    setProject(ProjectPages[previous])
  }

  return (
    <div className="h-screen flex text-zinc-800 dark:text-zinc-50 bg-zinc-300 dark:bg-zinc-700 bg-topography">
      <div className="m-auto">
        {mounted && (
          <div className="flex flex-col">
            <div className="flex space-x-3">
              <button
                className="text-5xl font-extrabold"
                onClick={movePrevious}
              >
                <AiFillCaretLeft className="hover:text-zinc-600 dark:hover:text-zinc-300" />
              </button>
              <h1 className="w-72 md:w-[36rem] text-6xl md:text-7xl text-center font-extrabold hover:text-zinc-600 dark:hover:text-zinc-300 hover:cursor-pointer">
                <Link
                  href={`${locale !== 'en' ? locale : ''}${project?.path}`}
                >{`Steam ${project?.title}`}</Link>
              </h1>
              <button className="text-5xl font-extrabold" onClick={moveNext}>
                <AiFillCaretRight className="hover:text-zinc-600 dark:hover:text-zinc-300" />
              </button>
            </div>
            <div className="h-full flex justify-center mt-1 space-x-1">
              {Array(ProjectPages.length)
                .fill(null)
                .map((_, indicatorIndex) => (
                  <div
                    key={indicatorIndex}
                    className={`w-2 h-2 ${
                      index === indicatorIndex
                        ? 'bg-zinc-800 dark:bg-zinc-50'
                        : 'bg-zinc-400'
                    }`}
                  />
                ))}
            </div>
            <div className="mx-auto mt-10 drop-shadow scale-150">
              <SwitchTheme />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
