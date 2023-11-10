---
title: Neovim, Deno, and TypeScript in a monorepo
date: 2023-11-09
description: How to avoid LSP conflicts
---

If you’ve ever tried to get both [Deno](https://deno.com/) and TypeScript LSP’s set up in Neovim you’ve likely run into configuration issues. Both Deno and TypeScript operate on `.ts` files, so by default both LSP’s will try to attach when you open a TypeScript file.

The Deno [docs](https://docs.deno.com/runtime/manual/getting_started/setup_your_environment#neovim-06-using-the-built-in-language-server) recommend using the root file pattern to avoid conflicts.

```lua
local nvim_lsp = require('lspconfig')

nvim_lsp.denols.setup {
  on_attach = on_attach,
  root_dir = nvim_lsp.util.root_pattern("deno.json", "deno.jsonc"),
}

nvim_lsp.tsserver.setup {
  on_attach = on_attach,
  root_dir = nvim_lsp.util.root_pattern("package.json"),
  single_file_support = false
}
```

This tells the Deno language server to only start if it finds a `deno.json` or `deno.jsonc` file at the root of your project. Similarly, the TypeScript language server will start if it finds a `package.json` file. The `single_file_support = false` part is needed to avoid the TypeScript LSP starting up in “single file mode” for any `.ts` file.

This mostly works, but if you’re in a monorepo set up with something like [pnpm](https://pnpm.io/), this won’t quite work because there is likely a `package.json` file setup at your workspace root:

```sh
my-monorepo/
  apps/
    deno-api/
      main.ts
      deno.jsonc
    typescript-frontend/
	  package.json
package.json
```

Opening `main.ts` will still attach the TypeScript language server because it finds the `package.json` at the workspace root. You'll end up with both the TypeScript and Deno LSP's attached.

The `root_dir` field is a function takes the filename as a parameter and is expected to return either a string or `nil`. If it returns `nil`, then the LSP won’t attach to the current buffer. We can use this idea to make a specialized `root_pattern_exclude` function that takes an exclusion value so that we only attach the TypeScript LSP if we _don’t_ find a Deno root file. Here’s what that might look like:

```lua
---Specialized root pattern that allows for an exclusion
---@param opt { root: string[], exclude: string[] }
---@return fun(file_name: string): string | nil
local function root_pattern_exclude(opt)
  local lsputil = require('lspconfig.util')

  return function(fname)
    local excluded_root = lsputil.root_pattern(opt.exclude)(fname)
    local included_root = lsputil.root_pattern(opt.root)(fname)

    if excluded_root then
      return nil
    else
      return included_root
    end
  end
end

lspconfig.tsserver.setup({
  on_attach = on_attach,
  root_dir = root_pattern_exclude({
    root = { "package.json" },
    exclude = { "deno.json", "deno.jsonc" }
  }),
  single_file_support = false
})

lspconfig.denols.setup({
  on_attach = on_attach,
  root_dir = lspconfig.util.root_pattern("deno.json", "deno.jsonc", "deno.lock"),
  init_options = {
    lint = true,
    suggest = {
      imports = {
        hosts = {
          ["https://deno.land"] = true,
        },
      },
    },
  },
})
```

Now, we can pull up a TypeScript file and, depending on which application we’re in within the monorepo, either the Deno LSP or the TypeScript LSP will start.
