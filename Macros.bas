Attribute VB_Name = "NewMacros"
Sub Макрос1()
'Макрос із кнопкою Ctrl + D
'Очищаємо формат
    Selection.WholeStory
    Selection.Find.ClearFormatting
    Selection.Find.Replacement.ClearFormatting
    
    
     ' ЗАМІНА НЕРОЗРИВНОГО ПРОБІЛУ НА ЗВИЧАЙНИЙ

'Функція пошуку
    With Selection.Find
        .Text = "^s" 'Знаходимо символи
        .Replacement.Text = " "     'Змінюємо
        .Forward = True             'обов*язково true
        .Wrap = wdStore
        .Format = False
        .MatchCase = False
        .MatchWholeWord = False
        .MatchAllWordForms = False
        .MatchSoundsLike = False
        .MatchWildcards = True      'обов*язково true
    End With
'Повторюємо для всього тексту
    Selection.Find.Execute Replace:=wdReplaceAll
    Selection.MoveLeft Unit:=wdCharacter, Count:=1
    
    
    ' ВИДАЛЕННЯ ПРОБІЛІВ ПЕРЕД ЗНАКАМИ ПУНКТУАЦІЇ
    
'Функція пошуку
    With Selection.Find
        .Text = " {1;}([.,:;\!\?])" 'Знаходимо символи
        .Replacement.Text = "\1"    'Змінюємо
        .Forward = True             'обов*язково true
        .Wrap = wdStore
        .Format = False
        .MatchCase = False
        .MatchWholeWord = False
        .MatchAllWordForms = False
        .MatchSoundsLike = False
        .MatchWildcards = True      'обов*язково true
    End With
'Повторюємо для всього тексту
    Selection.Find.Execute Replace:=wdReplaceAll
    Selection.MoveLeft Unit:=wdCharacter, Count:=1
   
    
    ' СТАВИМО ПРОБІЛ ПІСЛЯ ЗНАКУ ПУНКТУАЦІЇ
    
    'Функція пошуку
    With Selection.Find
        .Text = "([.,:;\!\?])" 'Знаходимо символи
        .Replacement.Text = "\1 "    'Змінюємо
        .Forward = True             'обов*язково true
        .Wrap = wdStore
        .Format = False
        .MatchCase = False
        .MatchWholeWord = False
        .MatchAllWordForms = False
        .MatchSoundsLike = False
        .MatchWildcards = True      'обов*язково true
    End With
'Повторюємо для всього тексту
    Selection.Find.Execute Replace:=wdReplaceAll
    Selection.MoveLeft Unit:=wdCharacter, Count:=1


    ' ВИДАЛЕННЯ ЗАЙВИХ ПРОБІЛІВ, ЩО ПОВТОРЮЮТЬСЯ

'Функція пошуку
    With Selection.Find
        .Text = " {2;}"              'знаходимо 2 і більше пробілів
        .Replacement.Text = " "      'змінюємо на один пробіл
        .Forward = True              'обов*язково true
        .Wrap = wdQuestion
        .Format = False
        .MatchCase = False
        .MatchWholeWord = False
        .MatchAllWordForms = False
        .MatchSoundsLike = False
        .MatchWildcards = True       'обов*язково true
    End With
'Повторюємо для всього тексту
    Selection.Find.Execute Replace:=wdReplaceAll
    Selection.MoveRight Unit:=wdCharacter, Count:=1
    
End Sub
