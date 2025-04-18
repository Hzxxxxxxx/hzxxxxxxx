import { styled } from '../stitches.config'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import Base from '../layouts/Base'
import { ButtonPrimary } from '../components/ButtonPrimary'
import Pronunciation from '../components/Pronunciation'
import Toast from '../components/Toast'
import stripHtml from '../lib/strip-html'
import items from '../data/about'
import Lottie from 'lottie-react'
import copyBioIcon from '../public/static/icons/copy-bio.json'
import downloadIcon from '../public/static/icons/download.json'

export async function getStaticProps() {
  const meta = {
    title: 'About // Zixiang He',
    description:
      "My research focuses on intelligent robotic systems, especially using model predictive control (MPC), reinforcement learning, and game theory. I'm currently working on robotic arm control with ROS2 and MoveIt, and interested in multi-agent collaboration, medical robotics, and task planning. I’m passionate about applying theory into real-world robotic systems, and continuously exploring ways to make robots smarter and more efficient.",
    tagline: 'Explore. Engineer. Excel.',
    image: '/static/images/about-bw.jpg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

function About(props) {
  const { title, description, image } = props
  const [toastTitle, setToastTitle] = React.useState('')
  const [toastDescription, setToastDescription] = React.useState('')
  const [showToast, setShowToast] = React.useState(false)
  const copyBioRef = React.useRef()
  const downloadRef = React.useRef()

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Zeno"
            src="/static/images/avatar.jpg"
            width="336"
            height="336"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            <strong>Hey, I'm Zixiang, </strong>
            and I’m currently a postgraduate student of the University of Manchester, majoring in <strong>Robotics</strong>.
          </Paragraph>
          <Paragraph>
            I’m excited to be part of this dynamic field, where <strong>innovation meets creativity </strong>and <strong>endless possibilities unfold</strong>. I’m always eager to learn and collaborate with others who share my passion for advancing the future of technology!
          </Paragraph>
          <Paragraph>
            I look forward to contributing to advancements in the field and addressing <strong>real-world challenges</strong>.
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderBio = () => {
    const btnStyle = { display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }
    const iconStyle = { width: 24, height: 24, marginRight: 8 }

    return (
      <div>
        <p></p>
        <blockquote>
          <p>{description}</p>
        </blockquote>
        <ButtonsContainer>
          <ButtonPrimary
            as="button"
            style={btnStyle}
            onClick={copyBio}
            onMouseEnter={() => copyBioRef.current?.play()}
            onMouseLeave={() => copyBioRef.current?.stop()}
          >
            <Lottie lottieRef={copyBioRef} style={iconStyle} animationData={copyBioIcon} loop={false} autoplay={false} />
            Copy Research Interests
          </ButtonPrimary>
          <span style={{ margin: '0 20px 0 10px' }}>•</span>
          <ButtonPrimary
            as="a"
            download
            role="button"
            href="/static/vedio/CV.pdf" // Updated to link to your CV
            style={btnStyle}
            onClick={downloadCV} // Updated function
            onMouseEnter={() => downloadRef.current?.play()}
            onMouseLeave={() => downloadRef.current?.stop()}
          >
            <Lottie lottieRef={downloadRef} style={iconStyle} animationData={downloadIcon} loop={false} autoplay={false} />
            Download CV
          </ButtonPrimary>
        </ButtonsContainer>
      </div>
    )
  }


  const renderSkills = () => {
    return (
      <Section>
        <h2>Skills & Expertise</h2>
        <ul style={{ paddingLeft: '1em' }}>
          <li>
            <span style={{ whiteSpace: 'nowrap' }}>
              <strong>Programming:</strong> C++, Python, Bash, MATLAB
            </span>
          </li>
          <li>
            <span style={{ whiteSpace: 'nowrap' }}>
              <strong>Frameworks:</strong> ROS2, ROS1, MoveIt, MPC, OpenCV
            </span>
          </li>
          <li>
            <span style={{ whiteSpace: 'nowrap' }}>
              <strong>Simulation:</strong> Gazebo, RViz, PyBullet
            </span>
          </li>
          <li>
            <span style={{ whiteSpace: 'nowrap' }}>
              <strong>Hardware:</strong> Realman Robotic Arm, RPLiDAR, Realsense
            </span>
          </li>
          <li>
            <span style={{ whiteSpace: 'nowrap' }}>
              <strong>Tools:</strong> Git, Docker, VSCode, Ubuntu, Jupyter, Manim
            </span>
          </li>
          <li>
            <span style={{ whiteSpace: 'nowrap' }}>
              <strong>Soft Skills:</strong> Research, Collaboration, Technical Writing, Presentations
            </span>
          </li>
        </ul>
      </Section>
    )
  }
  

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div style={{ marginBottom: 40 }} key={index}>
          <h3>{item.jobTitle}</h3>
          <p style={{ margin: 0 }}>
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {item.location}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy')
                : 'Present'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    })

    let durationStr = ''

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `
    }

    durationStr += `${durationObj.months} mos`

    return durationStr
  }

  const downloadCV = () => { // Updated function name
    setToastTitle('Downloading CV...')
    setToastDescription('Your CV is being downloaded.')
    setShowToast(true)
  }

  const copyBio = e => {
    e.preventDefault()
    navigator.clipboard.writeText(description)

    setToastTitle('Copied :D')
    setToastDescription('You can now paste it anywhere.')
    setShowToast(true)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://Hzxxxxxxx.com/about" property="og:url" />
        <meta content={`https://Hzxxxxxxx.com${image}`} property="og:image" />
      </Head>

      {renderIntro()}

      <h2>Research Interests</h2>
      {renderBio()}

      {/* New Skills Section */}
      {renderSkills()}

      {/*<h2>Career</h2>*/}
      {renderAll()}

      <Toast
        title={toastTitle}
        description={toastDescription}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const ButtonsContainer = styled('p', {
  display: 'flex',
  alignItems: 'center',
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

About.Layout = Base

export default About
