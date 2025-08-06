import { supabase } from './supabase'

export const saveViolation = async (userId, url, analysisResult) => {
  try {
    const violationsCount = analysisResult.violations ? analysisResult.violations.length : 0
    const score = calculateAccessibilityScore(analysisResult)

    const { data, error } = await supabase
      .from('violations')
      .insert([
        {
          user_id: userId,
          url: url,
          result: analysisResult,
          violations_count: violationsCount,
          score: score
        }
      ])
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error saving violation:', error)
    throw error
  }
}

export const getUserViolations = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('violations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching violations:', error)
    throw error
  }
}

const calculateAccessibilityScore = (result) => {
  if (!result.violations || !result.passes) return 0
  const total = result.violations.length + result.passes.length
  return total > 0 ? ((result.passes.length / total) * 100).toFixed(2) : 0
}
