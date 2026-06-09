import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getSite } from '../../features/site/siteApi';

function Home(props) {
  const [siteData, setSiteData] = useState({
    profile: '',
    project: '',
  });
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    //call api
    const fetchData = async () => {
      try {
        setShowLoading(true);
        const result = await getSite();
        setSiteData(result.data);
        console.log('siteData:', siteData);
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setShowLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="w-full mt-0 md:mt-16">

      <div className="">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{siteData.profile}</ReactMarkdown>
      </div>
      <div className="">Some of my favorite writing includes:</div>
      <div className="myFav">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{siteData.project}</ReactMarkdown>
      </div>
      <p className="contectme">
        You can{' '}
        <a
          className="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600"
          href="/writing"
        >
          read my writing
        </a>{' '}
        or{' '}
        <a
          href="https://github.com/tongweizj"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600"
        >
          code
        </a>
        , or{' '}
        <a
          href="https://x.com/tongweizj"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600"
        >
          follow me online
        </a>
        {'. '}
        <a
          href="mailto:tongweizj@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600"
        >
          Reach out
        </a>{' '}
        if interested.
      </p>
    </main>
  );
}
// withRouter will pass updated match, location, and history props
// to the wrapped component whenever it renders.
export default Home;
