import React from 'react';
import Head from 'next/head';
import { AnimateSharedLayout } from 'framer-motion';
import Base from '../layouts/Base';
import { Box } from '../components/Box';
import FeaturedTalk from '../components/FeaturedTalk';
import stripHtml from '../lib/strip-html';
import items from '../data/talks';

export async function getStaticProps() {
  const meta = {
    title: 'Experiences // Zixiang He',
    tagline: 'Think. Create. Transform.',
    image: '/static/images/talks-bw.jpg',
    primaryColor: 'purple',
    secondaryColor: 'cyan',
  };

  return { props: meta };
}

function Talks(props) {
  const renderFeatured = () => {
    const featured = ['Epic Web Conf', 'MSc Robotics', 'BEng Intelligent Science and Technology Engineering'];

    return items
      .map(item => {
        return item.talks.filter(talk => featured.includes(talk.title));
      })
      .filter(item => item.length > 0)
      .map((item, index) => {
        return <FeaturedTalk key={index} talk={item[0]} />;
      });
  };

  const renderAll = () => {
    return items
      .filter(item => item.year === '2024') // 仅保留年份为 2024 的项
      .map((item, index) => {
        return (
          <div key={index}>
            <h3>{item.year}</h3>
            <p>{item.summary}</p>
            {item.talks.map((talk, tIndex) => {
              return <TalkItem key={tIndex} talk={talk} />;
            })}
          </div>
        );
      });
  };

  const getTotalTalks = () => {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total += items[i].talks.length;
    }

    return total;
  };

  const { title, image } = props;
  const description = `I’ve worked in Beijing and Hangzhou, gained hands-on experience, and pursued education that has taken me to two different countries. Each role and academic pursuit has shaped my perspective, contributing to both my professional growth and personal development.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://Hzxxxxxxx.com/talks" property="og:url" />
        <meta content={`https://Hzxxxxxxx.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Education Experience</h2>
        <Box css={{ margin: '10px 0 0 -20px' }}>{renderFeatured()}</Box>

        <h2>Work Experiences</h2>
        {renderAll()}
      </AnimateSharedLayout>
    </>
  );
}

function TalkItem(props) {
  const { talk } = props;

  return (
    <div>
      <h3>
        <a href={talk.url} target="_blank" rel="noopener noreferrer">
          {talk.title}
        </a>
      </h3>
      <ul>
        <li>
          <em>When:</em> {talk.date}
        </li>
        <li>
          <em>Where:</em> {talk.where}
        </li>
        {talk.attendees && (
          <li>
            <em>Attendees:</em> {talk.attendees}
          </li>
        )}
        {talk.presentations &&
          talk.presentations.map((presentation, pIndex) => {
            return (
              <li key={pIndex}>
                <em>Position:</em>{' '}
                <a href={presentation.url} target="_blank" rel="noopener noreferrer">
                  {presentation.title}
                </a>{' '}
                {presentation.video && (
                  <a href={presentation.video} target="_blank" rel="noopener noreferrer">
                    (Video)
                  </a>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

Talks.Layout = Base;

export default Talks;
