# Contributing Guidelines

Thank you for contributing to Quickmart! This document provides guidelines for contributing code, bug reports, and feature requests.

## Code of Conduct

Be respectful, inclusive, and collaborative. We welcome contributions from everyone.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/Quickmart.git`
3. Create a feature branch: `git checkout -b feature/feature-name`
4. Make your changes
5. Test thoroughly
6. Submit a Pull Request

## Development Workflow

### Setup Development Environment

```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Start development servers
cd frontend && npm run dev  # Terminal 1
cd backend && npm run dev   # Terminal 2
```

### Coding Standards

#### TypeScript
- Use strict mode: `"strict": true`
- Type all function parameters and returns
- Use interfaces over types for object shapes
- Use enums for constants

#### File Organization
- One component per file
- Component file in lowercase with hyphens: `product-card.tsx`
- Related utilities in separate files

#### Naming Conventions
- Components: PascalCase (`ProductCard`)
- Functions: camelCase (`getProduct`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- Files: kebab-case (`product-card.tsx`)

#### Code Style
```typescript
// ✅ Good
const fetchProducts = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await api.get('/products', { params: { categoryId } });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// ❌ Bad
const fp = async (id) => {
  const r = await api.get('/products?id=' + id);
  return r.data;
};
```

### Git Commit Messages

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons
- `refactor`: Refactoring code
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Dependencies, build changes

**Examples:**
```
feat(product): add product filtering by price
fix(cart): resolve cart total calculation error
docs(api): update authentication documentation
refactor(auth): simplify login logic
```

### Branching Strategy

```
main (production)
  ├── release/v1.0.0
  └── develop (staging)
      ├── feature/user-authentication
      ├── feature/product-filters
      ├── bugfix/cart-calculation
      └── hotfix/payment-gateway
```

**Branch Naming:**
- Feature: `feature/description`
- Bug: `bugfix/description`
- Hotfix: `hotfix/description`
- Release: `release/v1.0.0`

### Testing

#### Unit Tests
```typescript
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  it('should render product name', () => {
    const product = { id: '1', name: 'Apple', price: 100 };
    render(<ProductCard product={product} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });
});
```

#### Running Tests
```bash
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

#### Coverage Requirements
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### Pull Request Process

1. **Before submitting:**
   - Run tests: `npm run test`
   - Check types: `npm run type-check`
   - Run linter: `npm run lint`
   - Format code: `npm run format`

2. **PR Title:** Use conventional commits format

3. **PR Description:**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation

   ## Testing
   How was this tested?

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

4. **Review Process:**
   - Minimum 1 approval required
   - All checks must pass
   - CI/CD pipeline must succeed

5. **Merging:**
   - Squash commits for cleaner history
   - Delete branch after merge

## Reporting Issues

### Bug Reports

```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: macOS/Windows/Linux
- Browser: Chrome/Firefox/Safari
- Node version: 18.x

## Screenshots/Logs
If applicable, add screenshots or error logs
```

### Feature Requests

```markdown
## Feature Description
Clear description of what you want to add

## Use Case
Why is this feature needed?

## Proposed Solution
How you think it should work

## Alternatives
Other solutions you considered
```

## Documentation

- Update relevant markdown files in `/docs`
- Include code examples for new APIs
- Update API documentation for new endpoints
- Add comments for complex logic

## Performance Guidelines

- Optimize bundle size
- Use code splitting for large components
- Implement lazy loading for images
- Cache API responses appropriately
- Monitor Core Web Vitals

## Security Best Practices

- Never commit secrets or API keys
- Use environment variables for configuration
- Validate all user inputs
- Sanitize data before rendering
- Use HTTPS for all communications
- Follow OWASP guidelines

## Database Changes

- Always create migrations for schema changes
- Test migrations thoroughly
- Provide rollback procedures
- Document migration intent

## Review Process

Maintainers will:
- Review code quality
- Check for test coverage
- Verify documentation
- Ensure performance
- Validate security

## Getting Help

- Check existing issues and discussions
- Ask questions in discussions
- Review documentation
- Contact maintainers if stuck

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Quickmart! 🎉**
