# Contributing to Virtus Protocol

Thank you for your interest in contributing to Virtus Protocol! This document provides guidelines for contributing to the project.

---

## Ways to Contribute

### 1. Submit Ethical Dilemmas

We're always looking for new, thought-provoking ethical scenarios.

**Guidelines:**
- Dilemma should present a genuine moral conflict
- Must be clear and concise (50-500 words)
- Should fit within one of our 12 ethical categories
- Avoid extremely graphic or traumatic content
- No copyrighted content

**How to Submit:**
- Visit [virtusprotocol.com](https://virtusprotocol.com)
- Use the "Custom Dilemma" feature
- Or open an issue with the `dilemma-proposal` label

### 2. Rate AI Responses

Help build the leaderboard by rating model responses.

**Rating Guidelines:**
- Rate objectively across all 4 dimensions
- Consider the rubrics in [BENCHMARK_METHODOLOGY.md](./BENCHMARK_METHODOLOGY.md)
- Don't let model identity bias your ratings
- Base ratings on the response quality, not agreement with conclusions

### 3. Code Contributions

We accept contributions for:
- Bug fixes
- Documentation improvements
- New analysis tools
- Benchmark methodology enhancements

**Before Contributing Code:**
1. Check existing issues and PRs
2. Open an issue to discuss major changes
3. Fork the repository
4. Create a feature branch
5. Follow our coding standards (see below)

### 4. Documentation

Help improve our documentation:
- Fix typos and unclear explanations
- Add examples and use cases
- Translate documentation (coming soon)
- Create tutorials and guides

### 5. Research

Use Virtus Protocol data for research:
- Publish findings in academic journals
- Share insights with the community
- Cite us properly (see README)
- Contribute findings back to the project

---

## Development Setup

```bash
# Clone the repository
git clone https://github.com/virtusprotocol/virtus-protocol.git
cd virtus-protocol

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

---

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Provide type annotations for all public APIs
- Avoid `any` unless absolutely necessary
- Use interfaces for object shapes

### Code Style

```typescript
// ✅ Good
export function calculateScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b) / scores.length;
}

// ❌ Bad
export function calculateScore(scores) {
  return scores.reduce((a,b)=>a+b)/scores.length
}
```

### Documentation

- Add JSDoc comments for all exported functions
- Include examples in complex function documentation
- Keep comments concise and up-to-date

```typescript
/**
 * Calculate the average score for a model
 *
 * @param scores - Array of individual scores (1-5)
 * @returns Average score, or 0 if empty array
 *
 * @example
 * ```ts
 * const avg = calculateScore([5, 4, 5, 4]);
 * console.log(avg); // 4.5
 * ```
 */
export function calculateScore(scores: number[]): number {
  // implementation
}
```

---

## Pull Request Process

1. **Fork & Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clear, concise commit messages
   - Add tests for new functionality
   - Update documentation

3. **Test**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

4. **Submit PR**
   - Fill out the PR template
   - Link related issues
   - Request review from maintainers

5. **Review Process**
   - Maintainers will review within 7 days
   - Address feedback promptly
   - Keep PR scope focused

---

## Commit Message Format

Use conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Test additions/changes
- `refactor`: Code refactoring
- `chore`: Maintenance tasks

**Examples:**
```
feat(leaderboard): add category-specific rankings

fix(scoring): handle edge case with zero responses

docs(benchmark): clarify confidence interval calculation
```

---

## Code of Conduct

### Our Standards

- Be respectful and constructive
- Focus on objective evaluation
- Support open research principles
- Help create a welcoming environment

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or inflammatory comments
- Publishing others' private information
- Intentionally manipulating benchmark results

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report violations to: conduct@virtusprotocol.com

---

## Questions?

- Open an issue with the `question` label
- Join our Discord (coming soon)
- Email: contact@virtusprotocol.com

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Virtus Protocol! 🚀
