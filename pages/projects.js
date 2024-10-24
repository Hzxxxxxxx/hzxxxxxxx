import React from 'react'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import Base from '../layouts/Base'
import FeaturedProject from '../components/FeaturedProject'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'

export async function getStaticProps() {
  const meta = {
    title: 'Projects // Zixiang He',
    tagline: 'Build. Test. Improve.',
    image: '/static/images/projects-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Projects(props) {
  const renderFeatured = () => {
    const featured = ['Dracula', 'Clipboard.js', 'Resend', 'React Email']

    return items
      .map(item => {
        return item.projects.filter(project => featured.includes(project.title))
      })
      .filter(item => {
        if (item.length > 0) {
          return item
        }
      })
      .flat()
      .map((item, index) => {
        return <FeaturedProject key={index} project={item} />
      })
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.year}</h3>
          <ul>
            {item.projects.map((project, pIndex) => {
              return <ProjectItem key={pIndex} project={project} />
            })}
          </ul>
        </div>
      )
    })
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
  }

  const { title, image } = props
  const description = 'Here, I will delve into the details of my current work in the field of robotics. This section provides an overview of the project\'s objectives, methodologies, and key findings.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://Hzxxxxxxx.com/projects" property="og:url" />
        <meta content={`https://Hzxxxxxxx.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        {/* Updated title */}
        <h2 style={{ marginBottom: '20px' }}>
          Robotics Systems to Advance the United Nations Sustainable Development Goals (SDGs)
        </h2>

        {/* Video Element with margin for spacing */}
        <div style={{ textAlign: 'left', marginBottom: '40px', marginLeft: '50px' }}> {/* Consistent marginLeft */}
          <video 
            width="600" // Adjust width as needed
            height="400" // Adjust height as needed
            controls 
            style={{ border: '1px solid #ccc' }} // Optional styling
          >
            <source src="static/vedio/coursework1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Description for the video with consistent margin */}
          <p style={{ marginTop: '10px', fontSize: '16px', color: '#999', marginLeft: '-40px' }}> {/* Added marginLeft here */}
          This video showcases the innovative robotics systems designed to advance the United Nations' Sustainable Development Goals (SDGs). By integrating Robotics with sustainable practices, these systems aim to address pressing global challenges such as poverty, inequality, and environmental degradation. 
          </p>
        </div>
      </AnimateSharedLayout>
    </>
  )
}

function ProjectItem(props) {
  const { project } = props

  return (
    <li>
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {project.title}
      </a>
    </li>
  )
}

Projects.Layout = Base

export default Projects
