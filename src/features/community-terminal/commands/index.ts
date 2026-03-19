import type { Command, TerminalContext, TerminalLine } from './types'

function out(text: string): TerminalLine {
  return { type: 'output', text }
}
function info(text: string): TerminalLine {
  return { type: 'info', text }
}
function err(text: string): TerminalLine {
  return { type: 'error', text }
}
function mut(text: string): TerminalLine {
  return { type: 'muted', text }
}
function suc(text: string): TerminalLine {
  return { type: 'success', text }
}
function raw(text: string): TerminalLine {
  return { type: 'raw', text }
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i]![j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1]![j - 1]!
          : 1 + Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!, dp[i - 1]![j - 1]!)
  return dp[m]![n]!
}

const FORTUNES = [
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
  '"The best error message is the one that never shows up." — Thomas Fuchs',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
  '"Programming isn\'t about what you know; it\'s about what you can figure out." — Chris Pine',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"In theory, there is no difference between theory and practice. But, in practice, there is." — Jan L. A. van de Snepscheut',
]

const COMMANDS: Command[] = [
  {
    name: 'register',
    aliases: [],
    description: 'Create your identity on the network',
    usage: 'register',
    category: 'navigation',
    requiresAuth: false,
    execute: (_args, ctx) => {
      ctx.navigate('/register')
      return {
        output: [info(' Opening register...'), suc(' ✓ Form loaded.')],
        sidePanel: '/register',
      }
    },
  },
  {
    name: 'login',
    aliases: [],
    description: 'Authenticate with existing PID',
    usage: 'login',
    category: 'navigation',
    requiresAuth: false,
    execute: (_args, ctx) => {
      ctx.navigate('/login')
      return { output: [info(' Opening login...'), suc(' ✓ Form loaded.')], sidePanel: '/login' }
    },
  },
  {
    name: 'logout',
    aliases: [],
    description: 'Terminate current session',
    usage: 'logout',
    category: 'navigation',
    requiresAuth: true,
    execute: (_args, ctx) => {
      ctx.navigate('/')
      return { output: [info(' Session terminated.'), mut(' Goodbye. Until next commit.')] }
    },
  },
  {
    name: 'whoami',
    aliases: [],
    description: 'Display your member card',
    usage: 'whoami',
    category: 'navigation',
    requiresAuth: true,
    execute: (_args, ctx) => {
      if (!ctx.user) return { output: [err(' ✗ Not logged in. Try: login')] }
      ctx.navigate('/member-card/me')
      return {
        output: [info(' Opening your badge...'), suc(` ✓ You are ${ctx.user.username}.`)],
        sidePanel: '/member-card/me',
      }
    },
  },
  {
    name: 'member-card',
    aliases: ['members'],
    description: 'Browse all community badges',
    usage: 'member-card',
    category: 'navigation',
    requiresAuth: false,
    execute: (_args, ctx) => {
      ctx.navigate('/member-card')
      return {
        output: [info(' Opening member-card...'), suc(' ✓ Community loaded.')],
        sidePanel: '/member-card',
      }
    },
  },
  {
    name: 'ls',
    aliases: [],
    description: 'List members (ls members/ | ls mentors/ | ls mentees/)',
    usage: 'ls members/',
    category: 'community',
    requiresAuth: false,
    execute: (args, ctx) => {
      const target = args[0] ?? 'members/'
      const routeMap: Record<string, string> = {
        'members/': '/members',
        'mentors/': '/members?role=mentor',
        'mentees/': '/members?role=mentee',
      }
      const route = routeMap[target]
      if (!route)
        return {
          output: [
            err(` ✗ Unknown path: ${target}`),
            mut(' Try: ls members/ | ls mentors/ | ls mentees/'),
          ],
        }
      ctx.navigate(route)
      return { output: [info(` Listing ${target}...`), suc(' ✓ Loaded.')], sidePanel: route }
    },
  },
  {
    name: 'man',
    aliases: [],
    description: "Open a member's manual page",
    usage: 'man <username>',
    category: 'community',
    requiresAuth: false,
    execute: (args, ctx) => {
      const username = args[0]
      if (!username) return { output: [err(' ✗ Usage: man <username>')] }
      ctx.navigate(`/member-card/${username}`)
      return {
        output: [
          mut('ORGST(1)              Community Manual              ORGST(1)'),
          out(''),
          out(`Fetching manual page for ${username}...`),
          suc(' ✓ Loaded.'),
        ],
        sidePanel: `/member-card/${username}`,
      }
    },
  },
  {
    name: 'cat',
    aliases: [],
    description: 'Read a community document (manifesto.md | rules.md)',
    usage: 'cat <file>',
    category: 'community',
    requiresAuth: false,
    execute: (args, ctx) => {
      const file = args[0]
      const fileMap: Record<string, string> = {
        'manifesto.md': '/manifesto',
        'rules.md': '/rules',
      }
      if (!file || !fileMap[file])
        return {
          output: [
            err(` ✗ File not found: ${file ?? ''}`),
            mut(' Available: manifesto.md, rules.md'),
          ],
        }
      const route = fileMap[file]!
      ctx.navigate(route)
      return { output: [info(` Reading ${file}...`), suc(' ✓ Loaded.')], sidePanel: route }
    },
  },
  {
    name: 'ping',
    aliases: [],
    description: 'Send a hello signal to a member',
    usage: 'ping <username>',
    category: 'social',
    requiresAuth: true,
    execute: args => {
      const target = args[0]
      if (!target) return { output: [err(' ✗ Usage: ping <username>')] }
      return { output: [info(` Pinging ${target}...`), suc(` ✓ Pong received by ${target}.`)] }
    },
  },
  {
    name: 'ssh',
    aliases: [],
    description: 'Request a mentoring session (ssh mentor@<name>)',
    usage: 'ssh mentor@<username>',
    category: 'social',
    requiresAuth: true,
    execute: (args, ctx) => {
      const target = args[0]
      if (!target) return { output: [err(' ✗ Usage: ssh mentor@<username>')] }
      const username = target.replace(/^mentor@/, '')
      ctx.navigate(`/mentoring/${username}`)
      return {
        output: [info(` Connecting to ${username}...`), suc(' ✓ Mentoring session requested.')],
        sidePanel: `/mentoring/${username}`,
      }
    },
  },
  {
    name: 'git',
    aliases: [],
    description: 'Community activity feed (git log | git log --author=<name>)',
    usage: 'git log [--author=<username>]',
    category: 'social',
    requiresAuth: false,
    execute: (args, ctx) => {
      const sub = args[0]
      if (sub !== 'log')
        return { output: [err(` ✗ Unknown git subcommand: ${sub ?? ''}`), mut(' Try: git log')] }
      const authorFlag = args.find(a => a.startsWith('--author='))
      const author = authorFlag?.split('=')[1]
      const route = author ? `/activity?author=${author}` : '/activity'
      ctx.navigate(route)
      return {
        output: [
          info(author ? ` Fetching commits by ${author}...` : ' Fetching activity feed...'),
          suc(' ✓ Loaded.'),
        ],
        sidePanel: route,
      }
    },
  },
  {
    name: 'top',
    aliases: ['dashboard'],
    description: 'Community dashboard & stats',
    usage: 'top',
    category: 'social',
    requiresAuth: false,
    execute: (_args, ctx) => {
      ctx.navigate('/dashboard')
      return {
        output: [
          info(' Fetching community stats...  ⠋'),
          info(' Fetching community stats...  ⠙'),
          suc(' ✓ Dashboard loaded.'),
        ],
        sidePanel: '/dashboard',
      }
    },
  },
  {
    name: 'nano',
    aliases: [],
    description: 'Edit your profile (nano ~/.profile)',
    usage: 'nano ~/.profile',
    category: 'profile',
    requiresAuth: true,
    execute: (args, ctx) => {
      if (args[0] !== '~/.profile')
        return { output: [err(` ✗ nano: ${args[0] ?? ''}: Permission denied`)] }
      ctx.navigate('/profile/edit')
      return { output: [info(' Opening profile editor...')], sidePanel: '/profile/edit' }
    },
  },
  {
    name: 'chmod',
    aliases: [],
    description: 'Add or remove a skill (chmod +x ~/skills/<skill>)',
    usage: 'chmod +x ~/skills/<skill>',
    category: 'profile',
    requiresAuth: true,
    execute: args => {
      const flag = args[0]
      const path = args[1]
      if (!flag || !path) return { output: [err(' ✗ Usage: chmod +x ~/skills/<skill>')] }
      const skill = path.replace('~/skills/', '')
      return {
        output: [
          flag === '+x'
            ? suc(` ✓ Skill '${skill}' added to your profile.`)
            : info(` Skill '${skill}' removed.`),
        ],
      }
    },
  },
  {
    name: 'passwd',
    aliases: [],
    description: 'Change your secret',
    usage: 'passwd',
    category: 'profile',
    requiresAuth: true,
    execute: (_args, ctx) => {
      ctx.navigate('/profile/password')
      return { output: [info(' Opening password change form...')], sidePanel: '/profile/password' }
    },
  },
  {
    name: 'help',
    aliases: ['?'],
    description: 'Show available commands',
    usage: 'help [command]',
    category: 'shell',
    requiresAuth: false,
    execute: args => {
      if (args[0]) {
        const arg = args[0]
        const cmd = registry.find(c => c.name === arg || c.aliases.includes(arg))
        if (!cmd) return { output: [err(` ✗ No help for '${arg}'`)] }
        return {
          output: [
            out(''),
            raw(`  ${cmd.name}`),
            mut(`    ${cmd.description}`),
            mut(`    Usage: ${cmd.usage}`),
            out(''),
          ],
        }
      }
      return {
        output: [
          raw(''),
          raw('  ORGST Shell v1.0.0 — Available Commands'),
          raw(''),
          raw('  Navigation'),
          out('    register          Create your identity on the network'),
          out('    login             Authenticate with existing PID'),
          out('    logout            Terminate current session'),
          out('    whoami            Display your member card'),
          out('    member-card       Browse all community badges'),
          raw(''),
          raw('  Community'),
          out('    ls members/       List active community members'),
          out('    ls mentors/       List available mentors'),
          out('    ls mentees/       List registered mentees'),
          out("    man <user>        Open user's manual page"),
          out('    cat manifesto.md  Read the community manifesto'),
          raw(''),
          raw('  Social'),
          out('    ping <user>       Send a hello signal to a member'),
          out('    ssh mentor@<user> Request mentoring session'),
          out('    git log           View community activity feed'),
          out('    top               Community dashboard & stats'),
          raw(''),
          raw('  Profile'),
          out('    nano ~/.profile   Edit your bio and details'),
          out('    chmod +x ~/skills/<skill>   Add a skill'),
          out('    passwd            Change your secret'),
          raw(''),
          raw('  Shell'),
          out('    help [command]    Show this help or command details'),
          out('    clear             Clear terminal output'),
          out('    history           Show command history'),
          raw(''),
          mut('  Pro tip: Tab autocompletes. ↑↓ navigates history.'),
          mut('  Easter eggs exist. Find them. 🥚'),
          raw(''),
        ],
      }
    },
  },
  {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clear terminal output',
    usage: 'clear',
    category: 'shell',
    requiresAuth: false,
    execute: (_args, ctx) => {
      ctx.clearHistory()
      return { output: [] }
    },
  },
  {
    name: 'history',
    aliases: [],
    description: 'Show command history',
    usage: 'history',
    category: 'shell',
    requiresAuth: false,
    execute: () => ({ output: [] }),
  },
  {
    name: 'exit',
    aliases: [],
    description: 'Go home',
    usage: 'exit',
    category: 'shell',
    requiresAuth: false,
    execute: (_args, ctx) => {
      ctx.navigate('/')
      return { output: [mut(' Session ended.')] }
    },
  },
  {
    name: 'neofetch',
    aliases: [],
    description: 'Easter egg: system info',
    usage: 'neofetch',
    category: 'easter',
    requiresAuth: false,
    execute: (_args, ctx) => {
      const user = ctx.user?.username ?? 'newcomer'
      return {
        output: [
          raw(''),
          raw('        ██████╗ ██████╗  ██████╗ ███████╗    ' + user + '@nexus'),
          raw('       ██╔═══██╗██╔══██╗██╔════╝ ╚═╗██╔═╝    ─────────────'),
          raw('       ██║   ██║██████╔╝██║  ███╗  ║██║      OS: Orgst DEV_PLATFORM v1.0.0'),
          raw('       ██║   ██║██╔══██╗██║   ██║  ║██║      Host: nexus.orgst.dev'),
          raw('       ╚██████╔╝██║  ██║╚██████╔╝  ║██║      Shell: orgst-fish v1.0'),
          raw(
            '        ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═╝       Role: ' +
              (ctx.user?.role ?? 'unregistered'),
          ),
          raw('                                              Theme: Base16 Ocean'),
          raw('                                              ████████████████████'),
          raw(''),
        ],
      }
    },
  },
  {
    name: 'cowsay',
    aliases: [],
    description: 'Easter egg: ASCII cow with message',
    usage: 'cowsay <message>',
    category: 'easter',
    requiresAuth: false,
    execute: args => {
      const msg = args.join(' ') || 'Moo.'
      const line = '-'.repeat(msg.length + 2)
      return {
        output: [
          raw(` ${line}`),
          raw(`< ${msg} >`),
          raw(` ${line}`),
          raw('        \\   ^__^'),
          raw('         \\  (oo)\\_______'),
          raw('            (__)\\       )\\/\\'),
          raw('                ||----w |'),
          raw('                ||     ||'),
        ],
      }
    },
  },
  {
    name: 'fortune',
    aliases: [],
    description: 'Easter egg: random programming quote',
    usage: 'fortune',
    category: 'easter',
    requiresAuth: false,
    execute: () => {
      const quote = FORTUNES[Math.floor(Math.random() * FORTUNES.length)]!
      return { output: [raw(''), mut(quote), raw('')] }
    },
  },
  {
    name: 'sl',
    aliases: [],
    description: 'Easter egg: classic train',
    usage: 'sl',
    category: 'easter',
    requiresAuth: false,
    execute: () => ({
      output: [
        raw(''),
        raw('      ====        ________                ___________'),
        raw('  _D _|  |_______/        \\__I_I_____===__|_________|'),
        raw('   |(_)---  |   H\\________/ |   |        =|___ ___|'),
        raw('   /     |  |   H  |  |     |   |         ||_| |_||'),
        raw('  |      |  |   H  |__--------------------| [___] |'),
        raw('  | ________|___H__/__|_____/[][]~\\_______|       |'),
        raw('  |/ |   |-----------I_____I [][] []  D   |=======|__'),
        raw('__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__'),
        raw(' |/-=|___|=    ||    ||    ||    |_____/~\\___/'),
        raw('  \\_/      \\O=====O=====O=====O_/      \\_/'),
        raw(''),
      ],
    }),
  },
  {
    name: 'sudo',
    aliases: [],
    description: 'Easter egg: nice try',
    usage: 'sudo <command>',
    category: 'easter',
    requiresAuth: false,
    execute: args => {
      if (args.join(' ').includes('rm -rf')) {
        return {
          output: [
            raw(''),
            raw('  ⚠  Permission denied.'),
            out('  Nice try. Incident reported to @tiago.'),
            mut('  Your trust score decreased by 0.001%.'),
            mut('  Just kidding. Or am I?'),
            raw(''),
          ],
        }
      }
      return { output: [err(' ✗ sudo: command not allowed in community shell')] }
    },
  },
  {
    name: 'git blame',
    aliases: [],
    description: 'Easter egg',
    usage: 'git blame',
    category: 'easter',
    requiresAuth: false,
    execute: () => ({
      output: [
        raw(''),
        out("  It's always DNS. And it's always your fault."),
        out("  But here, we don't blame. We debug together. 🤝"),
        raw(''),
      ],
    }),
  },
]

export const registry = COMMANDS

export function parseAndExecute(
  rawInput: string,
  ctx: TerminalContext,
  historyList: string[],
): { lines: TerminalLine[]; sidePanel?: string } {
  const trimmed = rawInput.trim()
  if (!trimmed) return { lines: [] }

  const parts = trimmed.split(/\s+/)
  const cmdName = parts[0]!.toLowerCase()
  const args = parts.slice(1)

  if (cmdName === 'git' && args[0] === 'blame') {
    const cmd = registry.find(c => c.name === 'git blame')!
    return { lines: cmd.execute([], ctx).output }
  }

  if (cmdName === 'history') {
    return { lines: historyList.map((h, i) => out(`  ${String(i + 1).padStart(3)}  ${h}`)) }
  }

  const cmd = registry.find(c => c.name === cmdName || c.aliases.includes(cmdName))

  if (!cmd) {
    const closest = registry
      .filter(c => levenshtein(cmdName, c.name) <= 3)
      .sort((a, b) => levenshtein(cmdName, a.name) - levenshtein(cmdName, b.name))[0]
    return {
      lines: [
        err(` command not found: ${cmdName}`),
        mut(` → Type 'help' to see available commands`),
        ...(closest ? [mut(` → Did you mean: ${closest.name}?`)] : []),
      ],
    }
  }

  if (cmd.requiresAuth && !ctx.user) {
    return { lines: [err(` ✗ ${cmd.name}: requires authentication`), mut(' → Try: login')] }
  }

  const result = cmd.execute(args, ctx)
  const ret: { lines: TerminalLine[]; sidePanel?: string } = { lines: result.output }
  if (result.sidePanel !== undefined) ret.sidePanel = result.sidePanel
  return ret
}

export function getCompletions(prefix: string): string[] {
  if (!prefix) return []
  return registry
    .flatMap(c => [c.name, ...c.aliases])
    .filter(name => name.startsWith(prefix.toLowerCase()))
}
