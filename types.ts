
import React from 'react';

export type Language = 'vi' | 'en';
export type ProjectCategory = 'All' | 'Residential' | 'Commercial' | 'Hospitality' | 'Public';
export type MemberRole = 'Architect' | 'Project Manager' | 'Construction Manager';
export type ProjectStatus = 'Completed' | 'In Progress' | 'Conceptual';
export type SocialPlatform = 'Facebook' | 'Instagram' | 'Youtube' | 'Tiktok' | 'Twitter' | 'Linkedin' | 'Pinterest' | 'Website';
export type CircadianMode = 'dawn' | 'day' | 'golden' | 'night';

export type ProgressStage = 'Concept' | 'Design' | 'Permit' | 'Construction' | 'Finishing' | 'Handover';

export interface JobPosition {
  id: string;
  title: string;
  titleEn: string;
  department: string;
  departmentEn: string;
  type: 'Full-time' | 'Freelance' | 'Internship';
  active: boolean;
  description: string;
  requirements: string[];
}

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  positionId: string;
  positionTitle: string;
  portfolioUrl: string;
  coverLetter: string;
  timestamp: number;
  status: 'New' | 'Reviewing' | 'Shortlisted' | 'Rejected';
}

export interface TechnicalSpec {
  label: string;
  labelEn: string;
  value: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  hexCode: string;
  description: string;
}

export interface ProgressLog {
  stage: ProgressStage;
  date: string;
  description: string;
  descriptionEn?: string;
  images?: string[];
  completed: boolean;
}

export interface ProjectProgress {
  clientCode: string;
  currentStage: ProgressStage;
  percentComplete: number;
  logs: ProgressLog[];
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  active: boolean;
}

export interface VisitLog {
  id: string;
  timestamp: number;
  userAgent: string;
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  page: string;
}

export interface CustomerMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectDesc: string;
  timestamp: number;
  read: boolean;
  moodboard?: Material[];
}

export interface Award {
  id: string;
  year: number;
  title: string;
  titleEn: string;
  organization: string;
  organizationEn: string;
}

export interface OfficeLocation {
  id: string;
  name: string;
  nameEn: string;
  address: string;
  addressEn: string;
  phone: string;
  isMain: boolean;
}

export interface CoreValue {
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
}

export interface ProjectCoords {
  lat: number;
  lng: number;
}

export interface Project {
  id: number;
  title: string;
  titleEn?: string;
  location: string;
  locationEn?: string;
  category: ProjectCategory;
  image: string;
  gallery?: string[];
  description: string;
  descriptionEn?: string;
  sqm: number;
  year: number;
  client?: string;
  clientEn?: string;
  status?: ProjectStatus;
  coords?: ProjectCoords;
  progress?: ProjectProgress;
  tags?: string[];
  specs?: TechnicalSpec[];
}

export interface ExpertiseItem {
  skill: string;
  skillEn: string;
  level: number; // 0 - 100
}

export interface TeamMember {
  id: number;
  name: string;
  role: MemberRole;
  image: string;
  gallery?: string[];
  bio: string;
  bioEn?: string;
  quote?: string;
  quoteEn?: string;
  education?: string;
  educationEn?: string;
  specialties?: string[];
  specialtiesEn?: string[];
  projectsHandled?: number;
  expertise?: ExpertiseItem[];
  projectIds?: number[]; // IDs of projects this member led
  socialLinks?: {
    platform: SocialPlatform;
    url: string;
  }[];
}

export interface ServiceStep {
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
}

export interface Service {
  id: string;
  title: string;
  titleEn?: string;
  desc: string;
  descEn?: string;
  icon?: string; 
  bgImage?: string;
  gallery?: string[];
  process: ServiceStep[];
  subServices: string[];
  // New consulting fields
  estimatedTime?: string;
  estimatedTimeEn?: string;
  investmentLevel?: string;
  investmentLevelEn?: string;
  blueprintSample?: string;
}

// Global AI Studio interface defined within declare global to ensure identical modifiers and resolve type shadowing.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    // Modifier must match the platform's global declarations for aistudio property.
    aistudio: AIStudio;
  }
}
