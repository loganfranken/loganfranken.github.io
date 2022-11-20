---
title: "How I Fought and Won the Battle for Disk Space"
date: "2014-10-26"
categories: 
  - "personal"
tags: 
  - "disk-space"
---

For the past year or so, I have been strapped for disk space on my C: drive.

Every couple of weeks, I would notice that I only had a few gigabytes left. So I would run **Disk Cleanup**, hunt through **Add or Remove Programs** to find what I didn't need, and then end up with a little more breathing room. And then, in a couple weeks, it would happen again. I figured Windows Updates and temporary files were piling up somewhere, so I would go through the same process again, find a little more space to breath, and then, in a couple weeks, do it all over again.

Eventually, it got bad. Really bad. Windows started barking at me about low disk space. I started accepting one or two gigabytes as a reasonable amount of free space. That's when I decided to take more drastic measures:

## Really Uninstalling Everything

I thought I was pretty meticulous with my first passes through the Add or Remove Programs list, but then I got serious: I uninstalled older versions of the .NET framework, threw away applications that I only opened occasionally, and removed the parts of the Office suite I rarely touch (InfoPath, OneNote). This helped, of course, but I often found that I got a lot less space back than I expected.

## Symbolically Link MSOCACHE

I discovered a mysterious directory called `MSOCACHE` eating up a lot of space (nearly 2 gigs). Upon further research, it appears to be a local copy of the Microsoft Office installation files (allowing you to run the installer for repairs or maintenance without inserting an Office install disc).

Researching the directory online, I found a lot of mixed information about whether or not it can be "safely" deleted. The [official word from Microsoft](http://support.microsoft.com/kb/825933) is that you should _not_ try to remove it through Windows Explorer: instead, you can try and remove the files via Disk Cleanup. However, this option wasn't available to me, so I was left with the decision of whether or not to take the risk: clench my teeth, gird my loins, and just delete the directory.

Luckily, I found a [better solution](http://superuser.com/questions/173807/how-do-i-move-msocache-to-another-drive): just toss the directory over to another drive and symbolic link to it.

Phew, 2 gigs saved.

## Delete Old IIS Logs

While plundering the depths of my file system, I found another haven for disk space bloat: `C:\inetpup\logs\LogFiles`. This is where the log files for your local, IIS-hosted web applications get dumped. Since I do a lot of local development on IIS, there was a good chunk of log files just waiting to be deleted.

## Clean Up Experiments

Cleaning up old IIS log files made me realize that I had accumulated a lot of hard drive cobwebs from past experiments and old projects: I went through and cleared out forgotten IIS websites, old SQL databases gathering dust, and abandoned domain accounts (taking up a small amount of space in `C:\Users`).

## Disable Hibernate

Despite my best efforts, I was still hurting fro disk space: every time a Windows Update came through, I would lose almost everything I was able to eke out in my desperate attempts above.

I started Googling around and found [Scott Hanselman's wonderful guide to freeing up disk space](http://www.hanselman.com/blog/GuideToFreeingUpDiskSpaceUnderWindows7.aspx), which includes one of the easiest and quickest ways to reclaim disk space: disabling hibernate mode (`powercfg -h off`). I have 8 gigs of ram on my machine, so this automatically got me another 8 gigs of hard disk freedom.

## The Real Culprit

And, yet, after all of this, I was still haunted by the ever-shrinking sliver of free disk space left on my C: drive. Finally, I reached a point where I no longer had room for a Windows Update. In other words, I no longer had the space to install security updates. I had hit hard disk space rock bottom.

I was scared that maybe something was really wrong here: maybe some kind of malware was dumping files onto my machine?

I ran a virus scan. The virus scan ran on and on and on. For hours and hours. I noticed it was spending a great deal of time slogging through a stream of similarly-named files in the `C:\Windows\SysWOW64\config\systemprofile\AppData\Local\Microsoft\Windows\Temporary Internet Files\Content.IE5\` directory.

I started Googling around and stumbled upon [this beautiful post](http://answers.microsoft.com/en-us/ie/forum/ie10-windows_7/internet-explorer-10-downloading-massive-number-of/1b51fbf8-9cc2-4ed2-a150-947d7e02bb5f?page=3), with the following remark by some saint that goes by "DawGS":

> They kept coming back until I launched Fuslogvw and disabled logging from the settings section.

**Fuslogvw**. Oh.

If you're not familiar, the [Fusion Assembly Binding Log Viewer](http://www.hanselman.com/blog/BackToBasicsUsingFusionLogViewerToDebugObscureLoaderErrors.aspx) is a utility that lets you view which assemblies are being bound at runtime. This is a wonderful diagnostic tool in the cases where your .NET application is stubbornly picking up the wrong assembly: with the Viewer, you can specifically see which DLL is being bound from where.

Be careful, though, because if set it to **"Log all binds to disk"**, solve the immediate problem you were encountering, and then **happily forget to turn it off for an entire year**, your `Content.IE5` directory will be pumped full of log files. How many? Millions. And about how much disk space does that take up?

**40 gigs.**

## Cleaning Up

After tracking down the real problem, I needed to delete the directories and get the space back. In an act of almost childlike computing naivety, I went with a regular old right-click, send-to-Recycle-Bin delete. I locked my computer for the night, confident that my problems would be solved in the morning and, of course, came back to Windows still chugging away at the directory, unable to provide any sort of estimate of how long it would all take.

So, instead, I went with the tried-and-true command line: `del /f /s /q Content.IE5`.

With this approach, I got the excitement of watching it all happen: the console window was constantly churning with a play-by-play of every log file's death. Hundreds of files getting torn out of my computer every few minutes, my C: drive slowly regaining gigabytes of space each hour. But this raucous live stream seemed to be slowing down every other application running on my computer. On top of that, it was still taking _forever_ to finish.

I searched around for the quickest way to delete a large swath of files and stumbled upon a [helpful StackOverflow answer](http://superuser.com/questions/19762/mass-deleting-files-in-windows/289399#289399). The suggestion was still `del /f /s /q Content.IE5`, but with an important addition: `del /f/s/q foldername > nul`.

Although I lost the exciting blow-by-blow account, this silent but deadly approach appeared to go a lot easier on the rest of the computer. Was it any quicker? I'm not entirely sure (although without the need to output to the command line, one can only assume so): it still took a couple days to finish.

In the end, after months of struggle, I can finally install [BonziBuddy](http://en.wikipedia.org/wiki/BonziBuddy) on my computer.
