#!/usr/bin/env node
import * as fs from "fs";
import { glob } from "glob";
import { resolve } from "path";
export async function getUnoFilePaths({ cwd, }) {
    const unoFilePaths = await glob("**/*.uno.js", {
        ignore: "node_modules/**",
        cwd,
    });
    return unoFilePaths;
}
export async function getUnoFiles({ cwd, }) {
    const unoFiles = await Promise.all((await getUnoFilePaths({ cwd })).map((path) => import(path)));
    return unoFiles;
}
(async function () {
    if (process.argv.length < 3) {
        console.error("사용: node compile-uno-files.js <outDir>");
        return;
    }
    const outDir = resolve(process.argv[2]);
    console.log("*.uno.js 파일 컴파일 시작...");
    const sources = (await getUnoFiles({
        cwd: process.cwd(),
    }));
    console.log("총 ", sources.length, "개의 *.uno.js를 찾았습니다.");
    const compiled = {
        safelist: [],
    };
    sources.forEach((src) => {
        if (src.safelist) {
            if (!Array.isArray(src.safelist))
                src.safelist = [src.safelist];
            compiled.safelist.push(...src.safelist);
        }
    });
    fs.writeFileSync(outDir, JSON.stringify(compiled));
    console.log("완료!");
})();
