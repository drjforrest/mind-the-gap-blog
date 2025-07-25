export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'ai-bias-in-diagnostics',
    title: 'The Hidden Bias in AI Diagnostic Tools',
    date: '2024-05-15',
    category: 'Ethics',
    tags: ['AI', 'Bias', 'Diagnostics'],
    excerpt: 'Exploring how algorithmic bias in artificial intelligence can perpetuate health disparities in medical diagnostics.',
    content: `Artificial intelligence promises to revolutionize medical diagnostics, but what happens when the data used to train these powerful algorithms reflects existing societal biases? This post delves into the critical issue of algorithmic bias in AI diagnostic tools. We examine how unrepresentative datasets can lead to tools that are less accurate for minority populations, women, and other underrepresented groups. From dermatology apps that fail on darker skin tones to risk-scoring models that underestimate disease severity in certain demographics, the consequences are significant. We will discuss the sources of this bias, its real-world impact on patient care, and explore potential strategies for mitigation. Developing fair and equitable AI requires a conscious effort from developers, clinicians, and regulators to ensure that the future of medicine is inclusive for all. It's not just a technical problem; it's a profound ethical challenge we must address.`,
  },
  {
    slug: 'bridging-digital-divide',
    title: 'Bridging the Digital Divide in Telehealth',
    date: '2024-04-22',
    category: 'Access',
    tags: ['Telehealth', 'Access', 'Infrastructure'],
    excerpt: 'The rise of telehealth is leaving many behind. How can we ensure equitable access for all communities?',
    content: `The COVID-19 pandemic accelerated the adoption of telehealth, offering a convenient and safe way to access healthcare. However, this digital transformation has also highlighted a stark digital divide. Many individuals in rural, low-income, and elderly communities lack the necessary tools for virtual appointments, including reliable high-speed internet, smartphones, or computers. Furthermore, digital literacy presents another significant barrier. This article explores the multi-faceted nature of the digital divide in healthcare. We will analyze the impact on health outcomes and discuss innovative solutions being implemented to bridge this gap. From community-based technology hubs and digital navigator programs to policy changes aimed at expanding broadband infrastructure, we cover the essential steps needed to ensure that the benefits of telehealth are accessible to everyone, not just the privileged few.`,
  },
  {
    slug: 'data-privacy-wearables',
    title: 'Your Health, Their Data: Privacy in the Age of Wearables',
    date: '2024-03-30',
    category: 'Policy',
    tags: ['Data Privacy', 'Wearables', 'Regulation'],
    excerpt: 'Wearable health trackers collect vast amounts of personal data. Are current regulations enough to protect consumer privacy?',
    content: `Millions of people use wearable devices like smartwatches and fitness trackers to monitor their health. These gadgets collect a wealth of sensitive data, from heart rate and sleep patterns to location and activity levels. But where does all this data go, and who has access to it? In this post, we investigate the data privacy implications of the booming wearables market. We'll examine the data-sharing agreements of popular device manufacturers and the loopholes in current health privacy laws like HIPAA, which often do not cover consumer-generated health data. The potential for data misuse—from discriminatory insurance pricing to targeted advertising—is a growing concern. We argue for stronger regulations and greater transparency to give consumers more control over their personal health information. The future of personalized health depends on building a foundation of trust between users and technology companies.`,
  },
  {
    slug: 'ehr-interoperability-challenge',
    title: 'The Interoperability Challenge: Why Your Health Records Are Trapped',
    date: '2024-02-18',
    category: 'Technology',
    tags: ['EHR', 'Interoperability', 'Data Standards'],
    excerpt: 'Electronic Health Records (EHRs) were meant to streamline care, but a lack of interoperability creates data silos that can harm patients.',
    content: `Electronic Health Records (EHRs) were hailed as a major step forward in modernizing healthcare. The vision was a seamless flow of patient information between providers, leading to better-coordinated and safer care. The reality, however, is a fragmented landscape of incompatible systems. Data silos prevent a primary care physician from easily seeing hospital records or a specialist's notes, leading to redundant tests, medical errors, and frustrated patients and clinicians. This article breaks down the complex issue of EHR interoperability. We explore the technical, financial, and competitive barriers that have stalled progress. We will also highlight the importance of common data standards, like FHIR (Fast Healthcare Interoperability Resources), and the role of government incentives and regulations in pushing the industry towards a more connected future. Unlocking the full potential of digital health requires breaking down these digital walls.`,
  },
];

export function getAllPosts() {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAllTags() {
  const allTags = posts.flatMap((post) => post.tags);
  return [...new Set(allTags)];
}

export function getAllCategories() {
  const allCategories = posts.map((post) => post.category);
  return [...new Set(allCategories)];
}
