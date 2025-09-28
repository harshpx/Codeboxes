import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/* global process */
// monnaco editor languages names
export const languages = [
  "cpp",
  "java",
  "py",
  "c",
  "cs",
  "ts",
  "js",
  "dart",
  "kt",
  "swift",
  "go",
  "scala",
  "sh",
  "rs",
  "rb",
] as const;

export type LanguageType = (typeof languages)[number];

export const languageLabels: Record<LanguageType, string> = {
  cpp: "C++",
  java: "Java",
  py: "Python",
  c: "C",
  cs: "C#",
  ts: "Typescript",
  js: "Javascript",
  dart: "Dart",
  kt: "Kotlin",
  swift: "Swift",
  go: "Go",
  scala: "Scala",
  sh: "Bash",
  rs: "Rust",
  rb: "Ruby",
};

export const monacoLanguage: Record<LanguageType, string> = {
  cpp: "cpp",
  java: "java",
  py: "python",
  c: "c",
  cs: "csharp",
  ts: "typescript",
  js: "javascript",
  dart: "dart",
  kt: "kotlin",
  swift: "swift",
  go: "go",
  scala: "scala",
  sh: "shell",
  rs: "rust",
  rb: "ruby",
};

export const syntaxHighlighterLanguage: Record<LanguageType, string> = {
  cpp: "cpp",
  java: "java",
  py: "python",
  c: "c",
  cs: "csharp",
  ts: "typescript",
  js: "javascript",
  dart: "dart",
  kt: "kotlin",
  swift: "swift",
  go: "go",
  scala: "scala",
  sh: "bash",
  rs: "rust",
  rb: "ruby",
};

export const boilerplates: Record<LanguageType, string> = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    cout << "Hello, C++!" << endl;
    return 0;
}
`,

  java: `public class Main {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello, Java!");
    }
}
`,

  py: `def main():
    # Write your code here
    print("Hello, Python!")

if __name__ == "__main__":
    main()
`,

  c: `#include <stdio.h>

int main() {
    // Write your code here
    printf("Hello, C!\\n");
    return 0;
}
`,

  cs: `using System;

class Program {
    static void Main() {
        // Write your code here
        Console.WriteLine("Hello, C#!");
    }
}
`,

  ts: `function main(): void {
    // Write your code here
    console.log("Hello, TypeScript!");
}

main();
`,
  js: `function main() {
    // Write your code here
    console.log("Hello, JavaScript!");
}
    
main();`,
  dart: `void main() {
  // Write your code here
  print('Hello, Dart!');
}
`,

  kt: `fun main() {
    // Write your code here
    println("Hello, Kotlin!")
}
`,

  swift: `import Foundation

// Write your code here
print("Hello, Swift!")
`,

  go: `package main

import "fmt"

func main() {
    // Write your code here
    fmt.Println("Hello, Go!")
}
`,

  scala: `object Main extends App {
  // Write your code here
  println("Hello, Scala!")
}
`,

  sh: `#!/bin/bash
# Write your code here
echo "Hello, Bash!"
`,

  rs: `fn main() {
    // Write your code here
    println!("Hello, Rust!");
}
`,

  rb: `# Write your code here
puts "Hello, Ruby!"
`,
};

export const currentlySupportedLanguages: LanguageType[] = ["c", "cpp", "java", "py", "js"];

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_ENV === "prod") {
    return "https://codeboxes.152.42.158.94.nip.io";
  }
  return "http://localhost:8080";
};

export const baseUrl = getBaseUrl();

export const avatarList = [
  "https://i.imgur.com/8GO2mo5.png",
  "https://i.imgur.com/DX92Le8.png",
  "https://i.imgur.com/w6quc8D.png",
  "https://i.imgur.com/5KFWFer.png",
  "https://i.imgur.com/hZEkVPz.png",
  "https://i.imgur.com/uaTcVQo.png",
  "https://i.imgur.com/ZIPnYJU.png",
  "https://i.imgur.com/994qIEz.png",
  "https://i.imgur.com/xv7TdK9.png",
  "https://i.imgur.com/jW7j7H9.png",
  "https://i.imgur.com/Wx95aDx.png",
  "https://i.imgur.com/yG2mnU5.png",
];
