import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const languages = {
  "C++": "cpp",
  Java: "java",
  Python3: "python",
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

export const jdoodleLanguages = {
  "C++": "cpp17",
  Java: "java",
  Python3: "python3",
  C: "c",
  "C#": "csharp",
  Typescript: "typescript",
  Javascript: "javascript",
  Dart: "dart",
  Kotlin: "kotlin",
  Swift: "swift",
  Golang: "golang",
  Scala: "scala",
  R: "r",
  Bash: "bash",
  Rust: "rust",
  Ruby: "ruby",
};

export const languageExtensions: Record<string, string> = {
  "C++": "cpp",
  Java: "java",
  Python3: "py",
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

  Python3: `def main():
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

export type LanguageKeyType = keyof typeof languages;

export const currentlySupportedLanguages: LanguageKeyType[] = [
  "C",
  "C++",
  "Java",
  "Python3",
  "Javascript",
  "Golang",
];
