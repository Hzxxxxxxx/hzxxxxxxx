import React from 'react'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import Base from '../layouts/Base'
import FeaturedProject from '../components/FeaturedProject'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'
import { styled } from '../stitches.config'

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
        <ProjectSection>
          <Paragraph dangerouslySetInnerHTML={{ __html: description }} />
        </ProjectSection>
      </AnimateSharedLayout>

      <AnimateSharedLayout>
        <ProjectSection>
          <h2>Robotics Systems to Advance the United Nations Sustainable Development Goals (SDGs)</h2>
          <video width="100%" height="400" controls style={{ border: '1px solid #ccc' }}>
            <source src="static/vedio/coursework1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Paragraph>
            This video showcases innovative robotic systems designed to support the United Nations' Sustainable Development Goals (SDGs), such as reducing poverty, addressing inequality, and promoting environmental sustainability. The goal of the projects presented is to integrate robotics with sustainable practices to solve real-world global challenges. My contribution to this work was creating an explanatory video that introduces these robotics systems in an accessible and engaging way. Through researching and visualizing these projects, I gained a deeper understanding of how robotics can contribute to sustainability, and improved my skills in science communication and video production.
          </Paragraph>
        </ProjectSection>
      </AnimateSharedLayout>

      <AnimateSharedLayout>
        <ProjectSection>
          <h2>A Study on 360-Degree 2D Lidar System for Obstacle Detection and Environmental Sensing</h2>
          <video width="100%" height="400" controls style={{ border: '1px solid #ccc' }}>
            <source src="static/vedio/Coursework2.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
          <Paragraph>
            This video provides a comprehensive overview of the RPLidar sensor's working principle and performance evaluation. It introduces key metrics such as accuracy, range, angular resolution, and material reflectivity, and outlines their impact on RPLiDAR performance in various scenarios. The video explains the underlying time-of-flight principle, details the experimental methodology used to characterize the sensor, and presents visualized data to support our analysis. The results offer insights into the sensor's strengths and limitations, with clear conclusions supported by empirical evidence.
          </Paragraph>
        </ProjectSection>
      </AnimateSharedLayout>

      <AnimateSharedLayout>
        <ProjectSection>
          <h2>Perceptive Model Predictive Control on Custom Robotic Arm</h2>
          <img
            src="/static/images/MPC.png"
            alt="Perceptive MPC on Custom Robot"
            width="100%"
            height="400"
            style={{ border: '1px solid #ccc', objectFit: 'cover' }}
          />
          <Paragraph>
            Based on the open-source work by <em>Legged Robotics</em>, this project adapts the perceptive model predictive control (MPC) algorithm to a custom robotic arm platform. The original method, proposed in "Perceptive Model Predictive Control for Continuous Mobile Manipulation" (RA-L 2020), is extended and integrated with my own manipulator, leveraging the ROS Melodic environment and custom kinematic models.
            <br /><br />
            The controller was tuned to operate under real-time constraints and tested in both simulated and real hardware environments. Modifications included implementing a new `KinematicsInterface`, adjusting control frequency, and customizing perception modules for collision-aware motion planning. This project deepened my understanding of perception-aware planning, optimal control, and robot-software integration.
          </Paragraph>
          <Paragraph>
            🔗 <a href="https://github.com/Hzxxxxxxx/perceptive_mpc" target="_blank" rel="noopener noreferrer">View Forked Repository</a><br />
            📄 <a href="https://ieeexplore.ieee.org/document/9143786" target="_blank" rel="noopener noreferrer">Read Original Paper (IEEE RA-L)</a>
          </Paragraph>
        </ProjectSection>
      </AnimateSharedLayout>

      <AnimateSharedLayout>
        <ProjectSection>
          <h2>Robotic Systems Design Project Team2 (UoM AERO62520)</h2>
          <img
            src="/static/images/leo.png"
            alt="Robotic Systems Design Project"
            width="100%"
            height="400"
            style={{ border: '1px solid #ccc', objectFit: 'cover' }}
          />
          <Paragraph>
            This team project, developed during our MSc Robotics programme at the University of Manchester, aims to build an autonomous mobile manipulator that can explore an unknown environment, identify a target object, and bring it back using a robotic arm. The system integrates multiple hardware components such as LEO Core, Intel NUC, RPLIDAR A2M12, RealSense Depth Camera, and the Trossen PincherX 150 manipulator.
            <br /><br />
            The software stack is built on ROS2 Humble and runs on Ubuntu 22.04. Key modules include object detection using YOLO, 2D SLAM with SLAM-Toolbox, autonomous navigation via Nav2, and object grasping using Interbotix ROS manipulators. Real-time data processing and task coordination are distributed across the Intel NUC and Raspberry Pi 4. Our team implemented several custom ROS2 nodes and integrated various sensors and planners to support robust autonomous exploration and manipulation.
          </Paragraph>
          <Paragraph>
            🔗 <a href="https://github.com/Lyrance/Robotics_Team2" target="_blank" rel="noopener noreferrer">View GitHub Repository</a>
          </Paragraph>
        </ProjectSection>
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

// Styled Components
const ProjectSection = styled('div', {
  width: '100%',
  maxWidth: '1500px',
  margin: 'auto',
  padding: '0 20px',
  textAlign: 'left',
})

const Paragraph = styled('p', {
  marginTop: '10px',
  fontSize: '16px',
  color: '#888',
  lineHeight: '1.7',
})

export default Projects
