import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiSupabase,
  SiFirebase,
  SiDocker,
  SiGooglecloud,
  SiFastapi,
  SiFlask,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiGoogle,
  SiHuggingface,
  SiOllama,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { RiOpenaiFill } from 'react-icons/ri';
import { FiCloud, FiLink } from 'react-icons/fi';

/**
 * Technology stack showcased on the Technologies page and the home-page
 * marquee. Each entry pairs a brand icon with a signature color.
 */
export const technologies = [
  { name: 'Python', icon: SiPython, color: '#3776AB', category: 'Languages' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00', category: 'AI/ML' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', category: 'AI/ML' },
  { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8', category: 'AI/ML' },
  { name: 'React', icon: SiReact, color: '#61DAFB', category: 'Frontend' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', category: 'Backend' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'Database' },
  { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E', category: 'Backend' },
  { name: 'Firebase', icon: SiFirebase, color: '#DD2C00', category: 'Backend' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'DevOps' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', category: 'Cloud' },
  { name: 'Azure', icon: FiCloud, color: '#0078D4', category: 'Cloud' },
  { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4', category: 'Cloud' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688', category: 'Backend' },
  { name: 'Flask', icon: SiFlask, color: '#111111', category: 'Backend' },
  { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#F7931E', category: 'AI/ML' },
  { name: 'Pandas', icon: SiPandas, color: '#150458', category: 'Data' },
  { name: 'NumPy', icon: SiNumpy, color: '#013243', category: 'Data' },
  { name: 'LangChain', icon: FiLink, color: '#1C7C54', category: 'AI/ML' },
  { name: 'OpenAI', icon: RiOpenaiFill, color: '#412991', category: 'AI/ML' },
  { name: 'Gemini', icon: SiGoogle, color: '#8E75F8', category: 'AI/ML' },
  { name: 'HuggingFace', icon: SiHuggingface, color: '#FFD21E', category: 'AI/ML' },
  { name: 'Ollama', icon: SiOllama, color: '#111111', category: 'AI/ML' },
];

export const techCategories = ['All', ...Array.from(new Set(technologies.map((t) => t.category)))];
