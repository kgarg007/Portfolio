'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from './db';
import { verifyAdminAuthorization, setAuthCookie, clearAuthCookie, comparePassword, signToken } from './auth';
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinary';
import {
  AdminLoginSchema,
  ContactMessageSchema,
  ProjectSchema,
  ExperienceSchema,
  SkillSchema,
  EducationSchema,
  AchievementSchema,
  HackathonSchema,
  CertificationSchema,
  SocialLinkSchema,
} from './validations';

import AdminUser from '@/models/AdminUser';
import SiteContent from '@/models/SiteContent';
import SiteSettings from '@/models/SiteSettings';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Skill from '@/models/Skill';
import Education from '@/models/Education';
import Achievement from '@/models/Achievement';
import Hackathon from '@/models/Hackathon';
import Certification from '@/models/Certification';
import SocialLink from '@/models/SocialLink';
import NavigationItem from '@/models/NavigationItem';
import Media from '@/models/Media';
import ContactMessage from '@/models/ContactMessage';

// ==========================================
// 1. AUTHENTICATION ACTIONS
// ==========================================
export async function adminLoginAction(prevState: any, formData: FormData) {
  try {
    await connectToDatabase();
    const rawData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    const parsed = AdminLoginSchema.safeParse(rawData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const admin = await AdminUser.findOne({ username: parsed.data.username.trim() });
    if (!admin) {
      return { success: false, error: 'Invalid username or password' };
    }

    const isValid = await comparePassword(parsed.data.password, admin.passwordHash);
    if (!isValid) {
      return { success: false, error: 'Invalid username or password' };
    }

    const token = signToken({ userId: admin._id.toString(), username: admin.username });
    await setAuthCookie(token);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Login failed due to server error' };
  }
}

export async function adminLogoutAction() {
  await clearAuthCookie();
  revalidatePath('/admin');
  return { success: true };
}

// ==========================================
// 2. SITE CONTENT (COPY CMS) ACTIONS
// ==========================================
export async function updateSiteContentAction(key: string, value: string, group: string = 'general') {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await SiteContent.findOneAndUpdate(
    { key },
    { key, value, group },
    { upsert: true, new: true }
  );

  revalidatePath('/');
  revalidatePath('/admin/content');
  return { success: true };
}

export async function updateMultipleSiteContentsAction(contents: { key: string; value: string; group: string }[]) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  for (const item of contents) {
    await SiteContent.findOneAndUpdate(
      { key: item.key },
      { key: item.key, value: item.value, group: item.group },
      { upsert: true, new: true }
    );
  }

  revalidatePath('/');
  revalidatePath('/admin/content');
  return { success: true };
}

export async function updateSiteSettingsAction(settingsData: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const settings = await SiteSettings.findOne();
  if (settings) {
    await SiteSettings.findByIdAndUpdate(settings._id, settingsData, { new: true });
  } else {
    await SiteSettings.create(settingsData);
  }

  revalidatePath('/');
  revalidatePath('/admin/settings');
  return { success: true };
}

// ==========================================
// 3. PROJECTS CRUD ACTIONS
// ==========================================
export async function createProjectAction(data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = ProjectSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const existingSlug = await Project.findOne({ slug: parsed.data.slug });
  if (existingSlug) {
    return { success: false, error: 'A project with this slug already exists.' };
  }

  const project = await Project.create(parsed.data);
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath('/admin/projects');
  return { success: true, project: JSON.parse(JSON.stringify(project)) };
}

export async function updateProjectAction(id: string, data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = ProjectSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const updated = await Project.findByIdAndUpdate(id, parsed.data, { new: true });
  revalidatePath('/');
  revalidatePath('/projects');
  if (updated?.slug) revalidatePath(`/projects/${updated.slug}`);
  revalidatePath('/admin/projects');
  return { success: true, project: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteProjectAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const project = await Project.findById(id);
  if (project?.coverImage?.publicId) {
    await deleteFromCloudinary(project.coverImage.publicId);
  }
  if (project?.gallery?.length) {
    for (const img of project.gallery) {
      if (img.publicId) await deleteFromCloudinary(img.publicId);
    }
  }

  await Project.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  return { success: true };
}

// ==========================================
// 4. EXPERIENCE CRUD ACTIONS
// ==========================================
export async function createExperienceAction(data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = ExperienceSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const exp = await Experience.create(parsed.data);
  revalidatePath('/');
  revalidatePath('/admin/experience');
  return { success: true, experience: JSON.parse(JSON.stringify(exp)) };
}

export async function updateExperienceAction(id: string, data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = ExperienceSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const updated = await Experience.findByIdAndUpdate(id, parsed.data, { new: true });
  revalidatePath('/');
  revalidatePath('/admin/experience');
  return { success: true, experience: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteExperienceAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await Experience.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/admin/experience');
  return { success: true };
}

// ==========================================
// 5. SKILLS CRUD ACTIONS
// ==========================================
export async function createSkillAction(data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = SkillSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const skill = await Skill.create(parsed.data);
  revalidatePath('/');
  revalidatePath('/admin/skills');
  return { success: true, skill: JSON.parse(JSON.stringify(skill)) };
}

export async function updateSkillAction(id: string, data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = SkillSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const updated = await Skill.findByIdAndUpdate(id, parsed.data, { new: true });
  revalidatePath('/');
  revalidatePath('/admin/skills');
  return { success: true, skill: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteSkillAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await Skill.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/admin/skills');
  return { success: true };
}

// ==========================================
// 6. EDUCATION CRUD ACTIONS
// ==========================================
export async function createEducationAction(data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = EducationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const edu = await Education.create(parsed.data);
  revalidatePath('/');
  revalidatePath('/admin/education');
  return { success: true, education: JSON.parse(JSON.stringify(edu)) };
}

export async function updateEducationAction(id: string, data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = EducationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const updated = await Education.findByIdAndUpdate(id, parsed.data, { new: true });
  revalidatePath('/');
  revalidatePath('/admin/education');
  return { success: true, education: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteEducationAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await Education.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/admin/education');
  return { success: true };
}

// ==========================================
// 7. ACHIEVEMENTS CRUD ACTIONS
// ==========================================
export async function createAchievementAction(data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = AchievementSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const ach = await Achievement.create(parsed.data);
  revalidatePath('/');
  revalidatePath('/admin/achievements');
  return { success: true, achievement: JSON.parse(JSON.stringify(ach)) };
}

export async function updateAchievementAction(id: string, data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = AchievementSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const updated = await Achievement.findByIdAndUpdate(id, parsed.data, { new: true });
  revalidatePath('/');
  revalidatePath('/admin/achievements');
  return { success: true, achievement: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteAchievementAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await Achievement.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/admin/achievements');
  return { success: true };
}

// ==========================================
// 8. HACKATHONS CRUD ACTIONS
// ==========================================
export async function createHackathonAction(data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = HackathonSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const hack = await Hackathon.create(parsed.data);
  revalidatePath('/');
  revalidatePath('/admin/hackathons');
  return { success: true, hackathon: JSON.parse(JSON.stringify(hack)) };
}

export async function updateHackathonAction(id: string, data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = HackathonSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const updated = await Hackathon.findByIdAndUpdate(id, parsed.data, { new: true });
  revalidatePath('/');
  revalidatePath('/admin/hackathons');
  return { success: true, hackathon: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteHackathonAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await Hackathon.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/admin/hackathons');
  return { success: true };
}

// ==========================================
// 9. CERTIFICATIONS CRUD ACTIONS
// ==========================================
export async function createCertificationAction(data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = CertificationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const cert = await Certification.create(parsed.data);
  revalidatePath('/');
  revalidatePath('/admin/certifications');
  return { success: true, certification: JSON.parse(JSON.stringify(cert)) };
}

export async function updateCertificationAction(id: string, data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = CertificationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const updated = await Certification.findByIdAndUpdate(id, parsed.data, { new: true });
  revalidatePath('/');
  revalidatePath('/admin/certifications');
  return { success: true, certification: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteCertificationAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await Certification.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/admin/certifications');
  return { success: true };
}

// ==========================================
// 10. SOCIAL & NAVIGATION ACTIONS
// ==========================================
export async function createSocialLinkAction(data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = SocialLinkSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const social = await SocialLink.create(parsed.data);
  revalidatePath('/');
  revalidatePath('/admin/social');
  return { success: true, social: JSON.parse(JSON.stringify(social)) };
}

export async function updateSocialLinkAction(id: string, data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const parsed = SocialLinkSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const updated = await SocialLink.findByIdAndUpdate(id, parsed.data, { new: true });
  revalidatePath('/');
  revalidatePath('/admin/social');
  return { success: true, social: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteSocialLinkAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await SocialLink.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/admin/social');
  return { success: true };
}

export async function createNavItemAction(data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const item = await NavigationItem.create(data);
  revalidatePath('/');
  revalidatePath('/admin/navigation');
  return { success: true, navItem: JSON.parse(JSON.stringify(item)) };
}

export async function updateNavItemAction(id: string, data: any) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const updated = await NavigationItem.findByIdAndUpdate(id, data, { new: true });
  revalidatePath('/');
  revalidatePath('/admin/navigation');
  return { success: true, navItem: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteNavItemAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await NavigationItem.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/admin/navigation');
  return { success: true };
}

// ==========================================
// 11. MEDIA & RESUME ACTIONS
// ==========================================
export async function uploadMediaAction(fileBase64: string, altText: string = '', folder: string = 'media') {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const uploaded = await uploadToCloudinary(fileBase64, folder);
  const media = await Media.create({
    url: uploaded.url,
    publicId: uploaded.publicId,
    resourceType: 'image',
    width: uploaded.width,
    height: uploaded.height,
    altText,
  });

  revalidatePath('/admin/media');
  return { success: true, media: JSON.parse(JSON.stringify(media)) };
}

export async function deleteMediaAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const media = await Media.findById(id);
  if (media?.publicId) {
    await deleteFromCloudinary(media.publicId);
  }
  await Media.findByIdAndDelete(id);

  revalidatePath('/admin/media');
  return { success: true };
}

export async function uploadProfilePhotoAction(fileBase64: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const settings = await SiteSettings.findOne();
  if (settings?.profilePhoto?.publicId) {
    await deleteFromCloudinary(settings.profilePhoto.publicId);
  }

  const uploaded = await uploadToCloudinary(fileBase64, 'profile');
  const profilePhoto = {
    url: uploaded.url,
    publicId: uploaded.publicId,
    altText: 'Krishna Garg Profile Photo',
  };

  if (settings) {
    settings.profilePhoto = profilePhoto;
    await settings.save();
  } else {
    await SiteSettings.create({ profilePhoto });
  }

  revalidatePath('/');
  revalidatePath('/admin/content');
  revalidatePath('/admin/settings');
  return { success: true, profilePhoto };
}

export async function removeProfilePhotoAction() {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const settings = await SiteSettings.findOne();
  if (settings?.profilePhoto?.publicId) {
    await deleteFromCloudinary(settings.profilePhoto.publicId);
  }

  if (settings) {
    settings.profilePhoto = { url: '', publicId: '', altText: '' };
    await settings.save();
  }

  revalidatePath('/');
  revalidatePath('/admin/content');
  return { success: true };
}

export async function uploadResumeAction(fileBase64: string, label: string = 'Download Resume') {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const settings = await SiteSettings.findOne();
  if (settings?.resume?.publicId) {
    await deleteFromCloudinary(settings.resume.publicId, 'raw');
  }

  const uploaded = await uploadToCloudinary(fileBase64, 'resume', 'raw');
  const resume = {
    fileUrl: uploaded.url,
    publicId: uploaded.publicId,
    label,
    updatedAt: new Date(),
  };

  if (settings) {
    settings.resume = resume;
    await settings.save();
  } else {
    await SiteSettings.create({ resume });
  }

  revalidatePath('/');
  revalidatePath('/admin/resume');
  return { success: true, resume };
}

export async function removeResumeAction() {
  await verifyAdminAuthorization();
  await connectToDatabase();

  const settings = await SiteSettings.findOne();
  if (settings?.resume?.publicId) {
    await deleteFromCloudinary(settings.resume.publicId, 'raw');
  }

  if (settings) {
    settings.resume = { fileUrl: '', publicId: '', label: 'Download Resume', updatedAt: new Date() };
    await settings.save();
  }

  revalidatePath('/');
  revalidatePath('/admin/resume');
  return { success: true };
}

// ==========================================
// 12. PUBLIC CONTACT MESSAGE ACTIONS
// ==========================================
export async function submitContactMessageAction(formData: any) {
  try {
    await connectToDatabase();
    const parsed = ContactMessageSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    if (parsed.data.honeypot && parsed.data.honeypot.trim() !== '') {
      return { success: true }; // Silent rejection for bots
    }

    await ContactMessage.create({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject || 'Portfolio Inquiry',
      message: parsed.data.message,
      read: false,
    });

    revalidatePath('/admin/messages');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to send message.' };
  }
}

export async function markMessageReadAction(id: string, read: boolean) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await ContactMessage.findByIdAndUpdate(id, { read });
  revalidatePath('/admin/messages');
  return { success: true };
}

export async function deleteMessageAction(id: string) {
  await verifyAdminAuthorization();
  await connectToDatabase();

  await ContactMessage.findByIdAndDelete(id);
  revalidatePath('/admin/messages');
  return { success: true };
}
