export function isPessoalProfile(profileType) {
  const normalized = String(profileType || "").trim().toLowerCase();
  return normalized === "pessoal" || normalized === "personal";
}

export function getProfileTypeLabel(profileType) {
  return isPessoalProfile(profileType) ? "Pessoal" : "Motorista";
}
