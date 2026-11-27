---
title: What does “customer value” actually mean?
number: 0
kicker: Article 1 · The idea
description: Why teams struggle to see the value of their work, the seven lenses of value, and the Value Graph and Valuable, the tools I am building to make value visible.
author: Venkat Raman
date: 2026-11-12
release: 0
---

For most of my career, I have heard leaders say some version of the same sentence: *“We want to create more value for our customers.”*

I have heard it in town halls, strategy decks and planning sessions. I have said it myself. And for a long time, I quietly failed to understand what it meant in practice.

Not the intent. The intent is clear and good. What I could not answer was the practical question behind it: when my team finishes a piece of work on Friday, how do we know whether it created value for anyone? And if it did, for whom, how much, and how would we ever see it?

## Lack of shared understanding of value

Over time I noticed that almost every team I worked with struggled with the same question. To be fair, it is not that nobody understands value. Leaders and product managers usually do a good job of identifying the outcomes customers and users want to improve, and many of them track those outcomes.

The problem is where that understanding lives. Usually it sits in a document written when the initiative was sponsored: a Confluence page with the problem, the target outcome and the business case. Sometimes it is tracked afterwards, sometimes not. Either way, it is mostly the product manager who knows it, and the rest of the organization cannot connect to it.

So when an initiative is delivered, it is hard for anyone else to trace whether it achieved the outcome it promised. Value may be measured, but it stays siloed in a document, with no traceability across the organization. Meanwhile, each function looks at value through its own slice:

- A finance leader thinks of value as return on the money invested.
- A delivery team thinks of value as features shipped on time.
- A product manager thinks of value as adoption and satisfaction.
- A customer thinks of value as a job that is now easier, faster or no longer needed.
- An executive thinks of value as growth, retention and strategic position.

Every one of these is right. The problem is that they rarely connect. Each group measures its own slice, reports it upwards, and assumes the slices add up to “customer value”. Often they do not. A team can ship everything on its roadmap while customers feel nothing has changed.

I spent years mapping value streams in Operational Excellence, and I kept running into the same gap: we could see the work clearly, and we could see the business results eventually, but the path between them was rarely visible to the people doing the work.

## Value is not one thing. It is a view through a lens.

It took me a long time to see that the people arguing about value were not disagreeing. They were looking at the same thing through different lenses. Each lens answers a different question, and value only becomes visible when you can move from one lens to the next without losing the thread.

Over the years I have started seeing value through seven lenses. Each one adds a piece of the picture that the others cannot show on their own:

<figure class="lens-chain">
  <ol aria-label="The seven lenses, in order">
    <li><span>Investment</span></li>
    <li><span>Delivery</span></li>
    <li><span>Offering</span></li>
    <li class="is-centre"><span>Customer</span></li>
    <li><span>User</span></li>
    <li><span>Value stream</span></li>
    <li><span>Strategic</span></li>
  </ol>
  <figcaption>Value flows through seven lenses, with the customer at the centre.</figcaption>
</figure>

1. **Investment** shows what we put in: people, time, money and tools. Without it, value has no cost, and we cannot tell a good bet from an expensive one.
2. **Delivery** shows the work we do with that investment and what we ship. It is the lens most teams already see, and on its own it only tells us we were busy.
3. **Offering** shows which products and services that work changes. It turns a list of tasks into something a customer could actually buy or use.
4. **Customer** sits right in the middle, which is probably what customer centricity is meant to be. It shows which customers the change matters to, today and in the future, and reminds us that value is always value *for someone*.
5. **User** shows the people, in their roles, who actually experience the change. A customer is an organization; the value is felt by individuals.
6. **Value stream** shows which step of the customer's own process gets better, and which need it meets. It places our work inside their work, where value is really decided.
7. **Strategic** shows how that customer value turns into value for our business: growth, retention, efficiency. It closes the loop back to why we invested in the first place.

No single lens tells the whole story, and each function in an organization tends to look through only one or two of them.

The piece I had been missing was the user's experience. Most models jump from “we delivered it” straight to “it produced an outcome”. In between, someone has to actually use the thing and find their work easier. That experience is where value is created or lost, and it is the part we measure least.

When you can trace a line through all seven lenses, from the hours invested to the strategic goal, “customer value” stops being a slogan.

## What I am building: the Value Graph and Valuable

What we cannot see, we cannot measure. And for most of the organization, value has stayed out of sight: defined in a document at the start, perhaps measured by a few people, but not something everyone else can see or follow. The whole point of the Value Graph is to make value tangible, traceable and visible. Once we can see what value really means for a customer, we can trace it, track it and improve it.

Making value visible also exposes something we rarely talk about: the assumptions behind it. Every initiative quietly assumes things. That this is the outcome customers want, that this feature will help them get it, and that it will matter to the business. Today those assumptions sit with whoever wrote the business case. When they are part of the graph, linked to the work and to the outcome they are supposed to produce, anyone in the organization can see them, and confirm or challenge them. A support engineer who hears the opposite from customers every week can say so, and the evidence lands right next to the assumption. That turns value from something one person is certain about into a feedback loop the whole organization can learn from.

The **Value Graph** is a connected map of value. Investments, work, offerings, customers, users, needs, outcomes and strategic goals each become a linked entity. Any piece of work can then be traced forward to the value it is meant to create, and any goal can be traced back to the work that serves it. Gaps are part of the result. When I first tried this on one value stream, our own journey from idea to impact, almost a quarter of the jobs people needed to do had nothing serving them at all. No dashboard had ever shown that.

**Valuable** is the interface on top of the graph. It is an AI assistant that anyone can ask, “How much value have we delivered so far?” or “Where is value leaking for this customer?”, and get a short answer that shows where every figure comes from. It also invites people to add what they learn from customers, so the map keeps improving.

<a class="cta" href="/explore/?release=0">
  <span class="cta__text">
    <strong>See it in action</strong>
    <span>Ask Valuable a question and watch it trace the answer through a Value Graph built on fictional demo data.</span>
  </span>
  <span class="cta__button">Explore Valuable →</span>
</a>

There is a second reason I care about this. AI agents are only as useful as the context we give them, and most organizational knowledge is scattered across documents, tickets and slides. A structured map of how work connects to value could become that context, for people and for agents alike.

I want to be honest: this is an idea I am still testing with my own work first to find out if it helps in building a shared understanding of value, help me make better decisions and be able to show how much value we have delivered. It may need to change a lot. That is the point of testing it.

## What it could unlock across the organization

If a shared map of value works, it gives every function a way to answer its own value question from the same source, instead of each team building its own version of the truth. Following the customer journey from first conversation to renewal, this is what I hope it makes possible:

- **Presales and sales:** Walk into a customer conversation knowing which needs similar customers have, which ones our offerings already meet, and the outcomes they have seen. Build value cases on evidence, not slideware.
- **Product managers:** See which customer needs are unserved or underserved, and which features are shipped but not making anyone's work easier. Prioritise by value, not by who shouts loudest.
- **Project and delivery managers:** Connect each initiative and Epic to the outcome it is meant to move, so “done” means “delivered value”, not just “closed tickets”.
- **Engineering teams:** Know why the work matters and for whom. When trade-offs come up, choose the option that protects the user's experience.
- **Customer success and support:** Feed what customers say straight into the map, so a repeated request becomes visible evidence rather than a lost ticket.
- **Finance and leadership:** Trace investment to outcomes and strategy, and see where value is leaking, before the quarterly numbers arrive.

None of this is proven yet. These are the questions the pilot will help answer.

## Over to you

If you have ever sat in a meeting nodding along to “customer value” while wondering what it means for your work, I would love to hear from you.

- How does your team define value today?
- Which lens do you look through most, and which one do you never see?
- Where does the trail go cold between the work you do and the value your customers feel?

I will share what we learn from the pilot, including what does not work. My hope is simple: to make people's lives easier and their work more valuable.
