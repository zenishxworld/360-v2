const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUserProfile = async () => {
  await delay(300);
  return {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    nationality: "Indian",
    phone: "+491234567890",
    dateOfBirth: "2000-05-15",
    targetCountries: ["Germany", "UK"],
  };
};

export const saveProfileDraft = async (profileData) => {
  await delay(300);
  return { success: true, data: profileData };
};

export const uploadProfilePhoto = async (file) => {
  await delay(500);
  return { success: true, data: { url: "/placeholder-avatar.png" } };
};

export const clearAllProfileDrafts = () => {};

export const getProfileCompletion = async () => ({ success: true, data: { percentage: 65, completedSteps: ["personal", "education"], remainingSteps: ["documents", "visa"] } });
export const deleteProfilePhoto = async () => ({ success: true });

export default { getUserProfile, saveProfileDraft, uploadProfilePhoto, clearAllProfileDrafts, getProfileCompletion, deleteProfilePhoto };
