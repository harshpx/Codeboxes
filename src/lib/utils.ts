import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LanguageKeyType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// monnaco editor languages names
export const languages = {
  "C++": "cpp",
  Java: "java",
  Python: "python",
  C: "c",
  "C#": "csharp",
  Typescript: "typescript",
  Javascript: "javascript",
  Dart: "dart",
  Kotlin: "kotlin",
  Swift: "swift",
  Golang: "go",
  Scala: "scala",
  R: "r",
  Bash: "shell",
  Rust: "rust",
  Ruby: "ruby",
};

// codeboxes api languages names
export const languageExtensions: Record<LanguageKeyType, string> = {
  "C++": "cpp",
  Java: "java",
  Python: "py",
  C: "c",
  "C#": "cs",
  Typescript: "ts",
  Javascript: "js",
  Dart: "dart",
  Kotlin: "kt",
  Swift: "swift",
  Golang: "go",
  Scala: "scala",
  R: "r",
  Bash: "sh",
  Rust: "rs",
  Ruby: "rb",
};

export const boilerplates: Record<LanguageKeyType, string> = {
  "C++": `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    cout << "Hello, C++!" << endl;
    return 0;
}
`,

  Java: `public class Main {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello, Java!");
    }
}
`,

  Python: `def main():
    # Write your code here
    print("Hello, Python!")

if __name__ == "__main__":
    main()
`,

  C: `#include <stdio.h>

int main() {
    // Write your code here
    printf("Hello, C!\\n");
    return 0;
}
`,

  "C#": `using System;

class Program {
    static void Main() {
        // Write your code here
        Console.WriteLine("Hello, C#!");
    }
}
`,

  Typescript: `function main(): void {
    // Write your code here
    console.log("Hello, TypeScript!");
}

main();
`,
  Javascript: `function main() {
    // Write your code here
    console.log("Hello, JavaScript!");
}
    
main();`,
  Dart: `void main() {
  // Write your code here
  print('Hello, Dart!');
}
`,

  Kotlin: `fun main() {
    // Write your code here
    println("Hello, Kotlin!")
}
`,

  Swift: `import Foundation

// Write your code here
print("Hello, Swift!")
`,

  Golang: `package main

import "fmt"

func main() {
    // Write your code here
    fmt.Println("Hello, Go!")
}
`,

  Scala: `object Main extends App {
  // Write your code here
  println("Hello, Scala!")
}
`,

  R: `# Write your code here
print("Hello, R!")
`,

  Bash: `#!/bin/bash
# Write your code here
echo "Hello, Bash!"
`,

  Rust: `fn main() {
    // Write your code here
    println!("Hello, Rust!");
}
`,

  Ruby: `# Write your code here
puts "Hello, Ruby!"
`,
};

export const currentlySupportedLanguages: LanguageKeyType[] = [
  "C",
  "C++",
  "Java",
  "Python",
  "Javascript",
  "Golang",
];

export const baseUrl = "https://codeboxes.152.42.158.94.nip.io";
