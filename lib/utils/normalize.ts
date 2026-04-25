// Caracteres invisíveis de direção que o iOS injeta antes de marcadores
// como `imagem ocultada`, `<anexado:` etc. Sem strip, regex que ancoram em
// palavra ou literal não casam. Cobre LRM, RLM, embeds/overrides e isolates.
const INVISIVEIS = /[‎‏‪-‮⁦-⁩]/g;

export function removerCaracteresInvisiveis(text: string): string {
  return text.replace(INVISIVEIS, "");
}
