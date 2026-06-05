import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        const apiUrl = '/api/api/site/';
        const result = await axios.get(apiUrl);
        setSiteData(result.data.data);
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
      <h1 id="lee-robinson" className="text-xl md:text-2xl mb-1 font-medium leading-13">
        {siteData.blogname}
      </h1>
      <p className="text-copy my-5">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{siteData.profile}</ReactMarkdown>
      </p>
      <p className="text-copy my-5">Some of my favorite writing includes:</p>

      <ReactMarkdown remarkPlugins={[remarkGfm]}>{siteData.project}</ReactMarkdown>
      <p className="text-copy my-5">
        You can{' '}
        <a
          className="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600"
          href="/writing"
        >
          read my writing
        </a>
        or{' '}
        <a
          href="https://github.com/leerob"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600"
        >
          code
        </a>
        , or{' '}
        <a
          href="https://x.com/leerob"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600"
        >
          follow me online
        </a>
        . I also make{' '}
        <a
          href="https://www.youtube.com/@leerob"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600"
        >
          videos
        </a>
        , advise companies, and do angel investing.{' '}
        <a
          href="mailto:lee@leerob.com"
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
