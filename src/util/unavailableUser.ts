export const unavailableUser = (callback: (page: string) => void) => {
  const result = confirm("해당 서비스는 로그인을 한 사용자만 사용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?");
  if (result) callback("/login");
};
