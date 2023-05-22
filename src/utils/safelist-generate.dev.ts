function v1(pre: string[], wor: readonly string[], suf: string): string[] {
  const ret: string[] = [];
  
  pre.forEach(p => {
    wor.forEach(w => {
      ret.push(`${p}${w}${suf}`);
    });
  });

  return ret;
}

export function generateAllCases(template: TemplateStringsArray, ...args: ReadonlyArray<string>[]): string[] {
  let temp: string[] = [template[0]];

  for (let i = 0; i < args.length; i++) {
    temp = v1(temp, args[i], template[i+1]);
  }

  return temp;
}