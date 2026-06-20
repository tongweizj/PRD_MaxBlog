import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSite } from '../../features/site/siteApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ExternalLink from '../../components/common/ExternalLink';
import MarkdownRenderer from '../../components/common/MarkdownRenderer';
function Home() {
  const [siteData, setSiteData] = useState({
    profile: '',
    project: '',
  });
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoading(true);
        const result = await getSite();
        // 兼容可能脱壳或未脱壳的 API 结构
        setSiteData(result.data || result);
      } catch (error) {
        console.error('加载首页站点配置失败:', error);
      } finally {
        setShowLoading(false);
      }
    };
    fetchData();
  }, []);

  if (showLoading) {
    return (
      <LoadingSpinner message="Loading digital garden..." fullPage variant="primary" />
    );
  }

  return (
    <main className="w-full mt-0 md:mt-16 px-3">
      {/* 个人简介 Markdown 渲染区 */}
      <div className="prose dark:prose-invert max-w-none mb-5">
        <MarkdownRenderer content={siteData.profile} />
      </div>

      <div className="text-secondary small fw-medium mb-3">Some of my favorite writing includes:</div>

      {/* 精选/项目推荐 Markdown 渲染区 */}
      <div className="myFav prose dark:prose-invert max-w-none mb-5">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{siteData.project}</ReactMarkdown>
      </div>

      {/* 底部极简社交及联系链接 */}
      <p className="contact-me text-muted small mt-5 pt-4 border-top border-light">
        You can{' '}
        <Link
          className="text-dark transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:text-neutral-500"
          to="/writing"
        >
          read my writing
        </Link>{' '}
        or{' '}
        <ExternalLink href="https://github.com/tongweizj">code</ExternalLink>, or{' '}
        <ExternalLink href="https://x.com/tongweizj">follow me online</ExternalLink>.
        {'. '}
        <a
          href="mailto:tongweizj@gmail.com"
          className="text-dark transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:text-neutral-500"
        >
          Reach out
        </a>{' '}
        if interested.
      </p>
    </main>
  );
}

export default Home;