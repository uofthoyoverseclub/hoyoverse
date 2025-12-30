import { FileText, Download, ExternalLink, Calendar, User } from 'lucide-react';
import { useState } from 'react';

interface Paper {
  id: number;
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  category: string;
  pdfUrl: string;
  externalUrl?: string;
}

const papers: Paper[] = [
  {
    id: 1,
    title: 'Machine Learning Applications in Climate Change Prediction',
    authors: ['Sarah Johnson', 'Michael Chen', 'Dr. Emily Roberts'],
    date: 'December 2024',
    abstract:
      'This paper explores the application of advanced machine learning algorithms in predicting climate change patterns. We present a novel approach using ensemble methods to improve prediction accuracy.',
    category: 'Machine Learning',
    pdfUrl: '#',
    externalUrl: '#',
  },
  {
    id: 2,
    title: 'Blockchain Technology for Secure Data Management',
    authors: ['David Park', 'Jessica Williams'],
    date: 'November 2024',
    abstract:
      'An investigation into implementing blockchain technology for enhanced data security in distributed systems. Our findings demonstrate significant improvements in data integrity and access control.',
    category: 'Blockchain',
    pdfUrl: '#',
  },
  {
    id: 3,
    title: 'Optimizing Web Performance with Edge Computing',
    authors: ['Alex Thompson', 'Emily Rodriguez', 'Prof. James Miller'],
    date: 'October 2024',
    abstract:
      'This study examines the impact of edge computing on web application performance. We propose a framework for optimizing content delivery and reducing latency in distributed web systems.',
    category: 'Web Technology',
    pdfUrl: '#',
    externalUrl: '#',
  },
  {
    id: 4,
    title: 'Natural Language Processing for Sentiment Analysis',
    authors: ['Michael Chen', 'Sarah Johnson'],
    date: 'September 2024',
    abstract:
      'We present a comprehensive analysis of NLP techniques for sentiment analysis in social media. Our approach combines transformer models with domain-specific training for improved accuracy.',
    category: 'NLP',
    pdfUrl: '#',
  },
  {
    id: 5,
    title: 'Quantum Computing: Current State and Future Prospects',
    authors: ['Dr. Emily Roberts', 'David Park', 'Alex Thompson'],
    date: 'August 2024',
    abstract:
      'A review of current quantum computing technologies and their potential applications in solving complex computational problems. We discuss the challenges and opportunities in this emerging field.',
    category: 'Quantum Computing',
    pdfUrl: '#',
    externalUrl: '#',
  },
  {
    id: 6,
    title: 'Cybersecurity in IoT Devices: Challenges and Solutions',
    authors: ['Jessica Williams', 'Emily Rodriguez'],
    date: 'July 2024',
    abstract:
      'This paper addresses the growing security concerns in IoT ecosystems. We propose a multi-layered security framework specifically designed for resource-constrained IoT devices.',
    category: 'Cybersecurity',
    pdfUrl: '#',
  },
];

const categories = ['All', ...Array.from(new Set(papers.map((p) => p.category)))];

export function Papers() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPapers =
    selectedCategory === 'All'
      ? papers
      : papers.filter((paper) => paper.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Research Papers</h1>
            <p className="text-xl text-blue-100">
              Explore cutting-edge research from our members and collaborators across various fields of study.
            </p>
          </div>
        </div>
      </section>

      {/* Papers List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Papers Grid */}
          <div className="space-y-6">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="text-blue-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl mb-2 text-gray-900">{paper.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User size={16} />
                            <span>{paper.authors.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{paper.date}</span>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                            {paper.category}
                          </span>
                        </div>
                        <p className="text-gray-600">{paper.abstract}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-3 lg:ml-4">
                    <a
                      href={paper.pdfUrl}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      <Download size={18} />
                      <span>Download PDF</span>
                    </a>
                    {paper.externalUrl && (
                      <a
                        href={paper.externalUrl}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                      >
                        <ExternalLink size={18} />
                        <span>View Online</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No papers found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Paper CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 text-gray-900">Want to Publish Your Research?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We welcome submissions from our members. Share your research with the community and contribute to our knowledge base.
          </p>
          <a
            href="mailto:research@clubname.com"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Submit Your Paper
          </a>
        </div>
      </section>
    </div>
  );
}
