/**
 * @param {flex-direction} d
 * @param {justify-content} j
 * @param {align-items} a
 */
export function flexbox({ d = "row", j = "center", a = "center" } = {}) {
  return `
        display:flex;
        flex-direction:${d};
        justify-content:${j};
        align-items:${a};
    `;
}
