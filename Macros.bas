Attribute VB_Name = "NewMacros"
Sub Ìàêðîñ5()
'Ìàêðîñ 5
'Î÷èùàºìî ôîðìàò
    Selection.WholeStory
    Selection.Find.ClearFormatting
    Selection.Find.Replacement.ClearFormatting
'Ôóíêö³ÿ ïîøóêó
    With Selection.Find
        .Text = " {1;}([.,:;\!\?])" 'Çíàõîäèìî ñèìâîëè
        .Replacement.Text = "\1"    'Çì³íþºìî
        .Forward = True             'îáîâ*ÿçêîâî true
        .Wrap = wdStore
        .Format = False
        .MatchCase = False
        .MatchWholeWord = False
        .MatchAllWordForms = False
        .MatchSoundsLike = False
        .MatchWildcards = True      'îáîâ*ÿçêîâî true
    End With
'Ïîâòîðþºìî äëÿ âñüîãî òåêñòó
    Selection.Find.Execute Replace:=wdReplaceAll
    Selection.MoveLeft Unit:=wdCharacter, Count:=1

'Ôóíêö³ÿ ïîøóêó
    With Selection.Find
        .Text = " {2;}"              'çíàõîäèìî 2 ³ á³ëüøå ïðîá³ë³â
        .Replacement.Text = " "      'çì³íþºìî íà îäèí ïðîá³ë
        .Forward = True              'îáîâ*ÿçêîâî true
        .Wrap = wdQuestion
        .Format = False
        .MatchCase = False
        .MatchWholeWord = False
        .MatchAllWordForms = False
        .MatchSoundsLike = False
        .MatchWildcards = True       'îáîâ*ÿçêîâî true
    End With
'Ïîâòîðþºìî äëÿ âñüîãî òåêñòó
    Selection.Find.Execute Replace:=wdReplaceAll
    Selection.MoveRight Unit:=wdCharacter, Count:=1
End Sub
