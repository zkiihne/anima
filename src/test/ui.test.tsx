import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

describe('Button', () => {
  it('renders label', () => {
    render(<Button>Get a quote</Button>)
    expect(screen.getByText('Get a quote')).toBeInTheDocument()
  })
  it('renders ghost variant', () => {
    const { container } = render(<Button variant="ghost">Learn more</Button>)
    expect(container.firstChild).toHaveClass('border')
  })
})

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge>iF Design</Badge>)
    expect(screen.getByText('iF Design')).toBeInTheDocument()
  })
})
