export function cleanArray(arr: string[] = []) {
  return arr.map(_ => _.trim()).filter(_ => _ !== '');
}

export function isGitHubTeam(username: string): boolean {
  return username.includes('/');
}
