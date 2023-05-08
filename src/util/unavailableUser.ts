export const unavailableUser = (callback: (page: string) => void) => {
  const result = confirm("로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동하시겠습니까?");
  if (result) callback("/login");
};
