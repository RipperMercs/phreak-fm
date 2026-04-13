/**
 * Easter egg for view-source visitors.
 * Rendered as a raw HTML comment on every page.
 * HTML comments cannot contain double-hyphen sequences, so borders use
 * single dashes, equals, and tildes only.
 */

const ODE = `
================================================================
                        p h r e a k . f m
           signals, frequencies, and the people who bend them
================================================================

   if you are reading this in view-source, you already get it.
   curiosity is the first exploit. every great hacker started
   by asking "what happens if i press this?"

   this site is a love letter to:

     the phreakers who whistled 2600 hz into a Bell handset and
     heard the whole continent open up. Draper. Engressia. the
     kids with tone dialers and blue boxes and a map of AT&T.

     the operators who ran wardialers at 3am and kept lab notes
     in three ring binders. 414s, LoD, MoD, cDc, L0pht, GNAA,
     Cult of the Dead Cow, Chaos Computer Club.

     Phrack. 2600. Hack-Tic. TAP. Yipl. every xeroxed page that
     shipped in a plain envelope to a PO box in Middle Island NY.

     the producers who bent the 303 until it screamed, who saw
     an 808 as a weapon, who pressed white labels and watched
     them move on touch alone. Warp. Rephlex. Metalheadz. R&S.
     Underground Resistance. Basic Channel. PAN.

     every sysop who ran a BBS out of their bedroom and paid
     the phone bill anyway. every IRC op who held a channel
     open while the world logged off. every zine editor who
     mailed the last issue before the feds arrived.

     the outsiders. the tinkerers. the ones who read the RFC
     instead of the README. the ones who took the thing apart
     not to steal it, but to understand it.

   this site runs on curiosity, caffeine, and the stubborn
   belief that the weird internet is worth preserving.

   no ads. no tracking you across the web. no dark patterns.
   just stories, sounds, and signal.

   if you want to talk:    hello [at] phreak.fm
   if you have a tip:      tips [at] phreak.fm
   if you want to lurk:    welcome. pull up a chair.

   "the hacker ethic is that information wants to be free,
    but so do the people who love it."

   stay weird. stay curious. keep bending the signal.

                                     /r. and the crew
================================================================
`;

export function SourceOde() {
  return <div hidden dangerouslySetInnerHTML={{ __html: `<!--${ODE}-->` }} />;
}
