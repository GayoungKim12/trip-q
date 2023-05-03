export interface SignUpFormInputsType {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  rule?: string;
}

export const SignUpFormInputs: SignUpFormInputsType[] = [
  {
    id: "id",
    label: "아이디",
    type: "text",
    placeholder: "아이디를 입력해주세요.",
    rule: "영문 소문자 또는 영문 소문자, 숫자 조합 6~12 자리",
  },
  {
    id: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
    rule: "영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리",
  },
  {
    id: "password-check",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 다시 입력해주세요.",
  },
  {
    id: "email",
    label: "이메일",
    type: "email",
    placeholder: "이메일을 입력해주세요.",
  },
  {
    id: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력해주세요.",
  },
];
