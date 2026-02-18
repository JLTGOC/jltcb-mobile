import { useRouter } from "expo-router";

type Options = {
  beforeNavigate?: () => void;
};

type Path =
  | string
  | {
      pathname: string;
      params?: Record<string, any>;
    };

export function useNavigate(options?: Options) {
  const router = useRouter();

  const navigate = (path: Path) => {

    if (typeof path === "string"){
        options?.beforeNavigate?.();
        router.push(path as any);
    } else {
        options?.beforeNavigate?.();
        router.push({
            pathname: path.pathname,
            params: {...path.params}
        } as any);
    }
  };

  const replace = (path:Path) => {
    options?.beforeNavigate?.();
    if(typeof path === "string"){
        router.replace(path as any)
    } else {
         router.replace({
            pathname: path.pathname,
            params: path.params
        } as any);
    }
  }

  const back = () => {
    options?.beforeNavigate?.();
    router.back();
  };

  return { navigate, replace, back};
}
