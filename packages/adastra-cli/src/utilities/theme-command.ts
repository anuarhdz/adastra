// @ts-expect-error
import Command from '@shopify/cli-kit/node/base-command'

interface FlagValues {
  [key: string]: boolean | string | string[] | number | undefined
}

interface PassThroughFlagsOptions {
  // Only pass on flags that are relevant to CLI2
  allowedFlags?: string[]
}

export default abstract class ThemeCommand extends Command {
  passThroughFlags(
    flags: FlagValues,
    { allowedFlags }: PassThroughFlagsOptions
  ): string[] {
    const passThroughFlags: string[] = []
    for (const [label, value] of Object.entries(flags)) {
      if (!(allowedFlags ?? []).includes(label)) {
        continue
      } else if (typeof value === 'boolean') {
        passThroughFlags.push(`--${label}`)
      } else if (Array.isArray(value)) {
        value.forEach(element =>
          passThroughFlags.push(`--${label}`, `${element}`)
        )
      } else {
        passThroughFlags.push(`--${label}`, `${value as string}`)
      }
    }
    return passThroughFlags
  }
}