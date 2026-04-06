import { MDXRemote } from 'next-mdx-remote/rsc'

const sharedComponents = {
  // Add any custom components you want to use inside your MDX files here.
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export function MDXContent({ code, components }: MDXProps) {
  return <MDXRemote source={code} components={{ ...sharedComponents, ...components }} />
}
